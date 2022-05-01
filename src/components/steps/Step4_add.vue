<template>
  <div>
    <div class="m-4">Gibt es ein Bild? Dann lade es bitte hoch.</div>
    <form @submit.prevent="submitForm">
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <!-- bulma template for file input -->
          <div class="file has-name is-boxed is-info">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="filename"
                accept="image/*"
                ref="myFiles"
                @change="refreshFilename"
              />

              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Wähle ein Bild
                </span>
              </span>
              <span class="file-name">
                {{ filename }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="button is-info m-3"
        @click="$emit('previous-page-s4')"
      >
        Zurück
      </button>
      <button type="submit" class="button is-info m-3">
        Fertig
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Step4_add",

  data() {
    return {
      name: this.$store.state.data.recipe.name,
      persons: this.$store.state.data.recipe.persons,
      time: this.$store.state.data.recipe.time,
      category: this.$store.state.data.recipe.category,
      ingredients: [...this.$store.state.data.recipe.ingredients], // makes a copy of array
      steps: [...this.$store.state.data.recipe.steps],

      filename: "",
    };
  },

  methods: {
    refreshFilename: function() {
      try {
        this.filename = this.$refs.myFiles.files[0].name;
      } catch (error) {
        // console.log("Wie kann man das hier ohne try-catch lösen?");
        // console.log(error);
        this.filename = "";
      }
    },

    submitForm: async function() {
      const reader = new FileReader();
      const allowed_file_size = 50000;
      var image = this.$refs.myFiles.files[0]; // is undefined, if no file is set

      // image size too big --> alert
      if (typeof image !== "undefined" && image.size > allowed_file_size) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: `Das Bild muss kleiner als 50kb sein.`,
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);
      }
      // upload image
      else {
        var data = {
          name: this.name,
          persons: this.persons,
          time: this.time,
          category: this.category,
          ingredients: this.ingredients,
          steps: this.steps,
          image: "",
        };

        // read file if exists
        if (typeof image !== "undefined") {
          await new Promise((resolve, reject) => {
            reader.onload = resolve;
            reader.onerror = reject;
            reader.readAsDataURL(image);
          })
            .then(() => {
              // set file in data
              data.image = reader.result;
            })
            .catch(() => {
              // catch some error during file read
            });
        }

        this.axios({
          method: "post",
          url: "upload_recipe",
          data: data,
        })
          .then((response) => {
            let alert = {
              _title: "Fertig!",
              _body: response.data.msg,
              isActive: true,
              okFunction: () => {
                this.$store.commit("closeAlert");
              },
              closeFunction: () => {
                this.$store.commit("closeAlert");
              },
            };

            this.$store.commit("showAlert", alert);
            this.$emit("next-page-s4");
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

              case 409: {
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
      }
    },
  },
};
</script>

<style scoped></style>
