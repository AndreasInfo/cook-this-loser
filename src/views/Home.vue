<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Mutti's Rezepte</div>

      <div class="has-text-centered">
        <button
          @click="$router.push({ name: 'Add' })"
          class="button is-info m-5"
        >
          Rezept hinzufügen
        </button>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <div class="field">
            <label class="label has-text-left">Suche:</label>
            <div class="control">
              <input
                class="input"
                v-model="search_input"
                type="text"
                placeholder="Rezept"
                maxlength="50"
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Ersteller:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select
                  v-model="creator_filter"
                  @change="
                    this.$store.commit('updateFilterCreator', creator_filter)
                  "
                >
                  <option>Alle</option>
                  <option v-for="(creator, index) in creators" :key="index">
                    {{ creator }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Kategorie:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select
                  v-model="category_filter"
                  @change="
                    this.$store.commit('updateFilterCategory', category_filter)
                  "
                >
                  <option>Alle</option>
                  <option v-for="(category, index) in categories" :key="index">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <!-- mobile version -->
          <table class="table has-text-left is-hidden-tablet">
            <tr
              v-for="(recipe_info, index) in recipies_info_filtered"
              :key="index"
            >
              <td class="break-word-this-shit">
                <a
                  @click="
                    $router.push({
                      name: 'Recipe',
                      params: {
                        creator: `${recipe_info.creator}`,
                        name: `${recipe_info.name}`,
                      },
                    })
                  "
                >
                  {{ recipe_info.name }}
                </a>
                <div>Kategorie: {{ recipe_info.category.join(", ") }}</div>
                <div>Ersteller: {{ recipe_info.creator }}</div>
              </td>
              <td>
                <i
                  @click="
                    $router.push({
                      name: 'Edit',
                      params: {
                        creator: `${recipe_info.creator}`,
                        name: `${recipe_info.name}`,
                      },
                    })
                  "
                  class="fas fa-edit fa-lg has-text-info"
                ></i>
              </td>
            </tr>
          </table>

          <!-- desktop and bigger  -->
          <table class="table has-text-left is-hidden-mobile">
            <thead>
              <tr>
                <th>Rezept</th>
                <th>Kategorie</th>
                <th>Ersteller</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(recipe_info, index) in recipies_info_filtered"
                :key="index"
              >
                <td class="break-word-this-shit">
                  <a
                    @click="
                      $router.push({
                        name: 'Recipe',
                        params: {
                          creator: `${recipe_info.creator}`,
                          name: `${recipe_info.name}`,
                        },
                      })
                    "
                  >
                    {{ recipe_info.name }}
                  </a>
                </td>
                <td>{{ recipe_info.category.join(", ") }}</td>
                <td>{{ recipe_info.creator }}</td>
                <td>
                  <i
                    @click="
                      $router.push({
                        name: 'Edit',
                        params: {
                          creator: `${recipe_info.creator}`,
                          name: `${recipe_info.name}`,
                        },
                      })
                    "
                    class="fas fa-edit fa-lg has-text-info"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",

  data() {
    return {
      recipies_info: [],

      search_input: "",

      creators: [],
      creator_filter: this.$store.state.filter.creator,
      categories: [],
      category_filter: this.$store.state.filter.category,
    };
  },

  computed: {
    recipies_info_filtered: function() {
      var recipies_info_filtered = this.recipies_info;

      // filter by creator
      if (this.creator_filter != "Alle") {
        recipies_info_filtered = recipies_info_filtered.filter((recipe) => {
          return recipe.creator == this.creator_filter;
        });
      }

      // filter by category
      if (this.category_filter != "Alle") {
        recipies_info_filtered = recipies_info_filtered.filter((recipe) => {
          return recipe.category.indexOf(this.category_filter) != -1;
        });
      }

      // filter by search field
      if (this.search_input != "") {
        recipies_info_filtered = recipies_info_filtered.filter((recipe) => {
          return (
            recipe.name
              .toLowerCase()
              .indexOf(this.search_input.toLowerCase()) != -1
          );
        });
      }

      // sort by name
      var recipies_info_filtered_and_sorted = recipies_info_filtered.sort(
        (a, b) => {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        }
      );

      return recipies_info_filtered_and_sorted;
    },
  },

  mounted: function() {
    this.axios({
      method: "get",
      url: "get_recipies_info",
    })
      .then((response) => {
        // get recipe_info
        this.recipies_info = response.data.data;

        // get distinct creators
        this.creators = new Set();
        this.recipies_info.forEach((recipe_info) => {
          this.creators.add(recipe_info.creator);
        });
        // console.log(this.creators);

        // get distinct categories
        this.categories = new Set();
        this.recipies_info.forEach((recipe_info) => {
          recipe_info.category.forEach((category) => {
            if (category != "") {
              this.categories.add(category);
            }
          });
        });
        // console.log(this.categories);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400: {
            let alert = {
              _title: "Sorry, hier ist ein Fehler!",
              _body: "Bitte melde dich beim Administrator.",
              isActive: true,
              okFunction: () => {
                this.$store.commit("closeAlert");
              },
              closeFunction: () => {
                this.$store.commit("closeAlert");
              },
            };
            this.$store.commit("showAlert", alert);
            break;
          }
          default: {
            let alert = {
              _title: "Sorry, hier ist ein Fehler!",
              _body: "Es scheint ein Problem mit deinem Internet zu geben.",
              isActive: true,
              okFunction: () => {
                this.$store.commit("closeAlert");
              },
              closeFunction: () => {
                this.$store.commit("closeAlert");
              },
            };
            this.$store.commit("showAlert", alert);
            break;
          }
        }
      });
  },
};
</script>

<style scoped></style>
