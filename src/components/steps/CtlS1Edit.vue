<template>
  <div>
    <div class="m-4">Was kochen wir? Gib bitte alle Daten ein.</div>

    <form @submit.prevent="submitForm">
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <button
            type="button"
            class="button is-danger my-5 is-fullwidth"
            @click="deleteButton"
          >
            Rezept löschen
          </button>

          <div class="field">
            <label class="label has-text-left">Rezept:</label>
            <div class="control">
              <input
                class="input"
                v-model="name"
                type="text"
                placeholder="Name"
                maxlength="50"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Personen:</label>
            <div class="control">
              <input
                class="input"
                v-model="persons"
                type="number"
                placeholder="Anzahl"
                min="1"
                max="9999"
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Dauer:</label>
            <div class="control">
              <input
                class="input"
                v-model="time"
                type="number"
                placeholder="Minuten"
                min="1"
                max="9999"
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Kategorie:</label>
            <Multiselect
              v-model="category"
              mode="multiple"
              placeholder="Kategorie"
              :multipleLabel="
                (value) => {
                  return value.length == 1
                    ? value[0].label
                    : value.length + ' Kategorien gewählt';
                }
              "
              :options="{
                Fleisch: 'Fleisch',
                Fisch: 'Fisch',
                Pasta: 'Pasta',
                Kartoffeln: 'Kartoffeln',
                Vegetarisch: 'Vegetarisch',
                Vegan: 'Vegan',
                Salate: 'Salate',
                Suppen: 'Suppen',
                Sushi: 'Sushi',
                Frühstück: 'Frühstück',
                Kuchen: 'Kuchen',
                Süßes: 'Süßes',
                Weihnachten: 'Weihnachten',
                Sonstiges: 'Sonstiges',
              }"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        class="button is-info m-3"
        @click="$emit('previous-page-s1')"
      >
        Zurück
      </button>
      <button type="submit" class="button is-info m-3">Weiter</button>
    </form>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  name: "CtlS1Edit",

  components: { Multiselect },

  data() {
    return {
      name: this.$store.state.data.recipe.name,
      persons: this.$store.state.data.recipe.persons,
      time: this.$store.state.data.recipe.time,
      category: [...this.$store.state.data.recipe.category],
    };
  },

  methods: {
    submitForm: function () {
      var allowed_word_length = 50;
      var words = this.name.split(" ");
      var words_with_20_char_or_more = words.filter((word) => {
        return word.length >= allowed_word_length;
      });

      if (words_with_20_char_or_more.length > 0) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: `Bitte verwende keine Wörter mit mehr als ${allowed_word_length} Zeichen?`,
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);
      } else {
        this.$store.commit("updateRecipeName", this.name);
        this.$store.commit("updateRecipePersons", this.persons);
        this.$store.commit("updateRecipeTime", this.time);
        this.$store.commit("updateRecipeCategory", this.category);

        this.$emit("next-page-s1");
      }
    },

    deleteButton: function () {
      let dialog = {
        _title: "Bist du sicher?",
        _body: "Das Rezept wird unwiderruflich gelöscht.",
        isActive: true,
        yesFunction: () => {
          var data = {
            name: this.$store.state.data.recipe.name,
          };

          this.axios({
            method: "post",
            url: "delete_recipe",
            data: data,
          })
            .then(() => {
              this.$router.replace({ name: "CtlHome" });
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

                case 401: {
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

                case 422: {
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
          this.$store.commit("closeDialog");
        },
        noFunction: () => {
          this.$store.commit("closeDialog");
        },
        closeFunction: () => {
          this.$store.commit("closeDialog");
        },
      };
      this.$store.commit("showDialog", dialog);
    },
  },
};
</script>

<style scoped></style>
