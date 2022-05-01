<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">{{ name }}</div>

      <div class="has-text-centered">
        <button
          @click="$router.push({ name: 'Home' })"
          class="button is-info m-5"
        >
          Zurück
        </button>
        <button @click="download_or_print_pdf" class="button is-info m-5">
          Drucken
        </button>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left transparent-background">
            <tr>
              <td class="is-vcentered">
                <div class="mb-1">
                  <span class="has-text-weight-bold">Personen: <br /></span>
                  {{ persons }}
                </div>
                <div class="mb-1">
                  <span class="has-text-weight-bold"> Zeit:<br /> </span>
                  {{ time }} Min.
                </div>
                <div class="mb-1">
                  <span class="has-text-weight-bold">Kategorie:<br /> </span>
                  {{ category.join(", ") }}
                </div>
                <div class="mb-1">
                  <span class="has-text-weight-bold"> Ersteller:<br /></span>
                  {{ creator }}
                </div>
              </td>
              <td class="is-vcentered">
                <img v-if="image" :src="image" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left">
            <tr>
              <td>
                <!-- empty row to maintain to top -->
              </td>
            </tr>

            <tr v-for="(ingredient, index) in ingredients" :key="index">
              <td class="pb-0 pt-0">
                {{ ingredient.amount }} {{ ingredient.unit }}
                <span class="has-text-weight-bold mt-2">{{
                  ingredient.name
                }}</span>
              </td>
            </tr>

            <tr v-for="(step, index) in steps" :key="index">
              <td colspan="2">
                <div class="has-text-weight-bold mt-2">
                  Schritt {{ step.id }}:
                </div>
                <p class="has-text-justified">{{ step.description }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipe",

  data() {
    return {
      name: this.$route.params.name,
      creator: this.$route.params.creator,
      time: "",
      persons: "",
      category: [],
      ingredients: [],
      steps: [],
      image: "",
    };
  },

  methods: {
    download_or_print_pdf: function() {
      var url = `get_recipe_as_pdf/c/${this.creator}/n/${this.name}`;
      window.open(process.env.VUE_APP_BASE_URL + url);
    },
  },

  mounted: function() {
    // get and show recipe
    var data = { name: this.name, creator: this.creator };

    this.axios({
      method: "post",
      url: "get_recipe",
      data: data,
    })
      .then((response) => {
        this.time = response.data.data.time;
        this.persons = response.data.data.persons;
        this.category = response.data.data.category;
        this.ingredients = response.data.data.ingredients;
        this.steps = response.data.data.steps;
        this.image = response.data.data.image;
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

          case 404: {
            let alert = {
              _title: "Sorry, hier ist ein Fehler!",
              _body: error.response.data.msg,
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
              _body: error.response.data.msg,
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

<style lang="scss" scoped>
.transparent-background {
  background-color: transparent;
}

img {
  border: 5px solid rgb(255, 255, 255);
  object-fit: cover !important;

  max-width: 210px;
  width: 100%;
  height: auto;
}
</style>
