<template>
  <div v-if="!loading" class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Rezept ändern:</div>

      <transition name="fade" mode="out-in">
        <component
          :is="view"
          @previous-page-s1="$router.replace({ name: 'CtlHome' })"
          @next-page-s1="updateView('CtlS2')"
          @previous-page-s2="updateView('CtlS1Edit')"
          @next-page-s2="updateView('CtlS3')"
          @previous-page-s3="updateView('CtlS2')"
          @next-page-s3="updateView('CtlS4Edit')"
          @previous-page-s4="updateView('CtlS3')"
          @next-page-s4="$router.replace({ name: 'CtlHome' })"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import CtlS1Edit from "../components/steps/CtlS1Edit.vue";
import CtlS2 from "../components/steps/CtlS2.vue";
import CtlS3 from "../components/steps/CtlS3.vue";
import CtlS4Edit from "../components/steps/CtlS4Edit.vue";

export default {
  name: "CtlEdit",

  components: {
    CtlS1Edit,
    CtlS2,
    CtlS3,
    CtlS4Edit,
  },

  data() {
    return {
      view: "",
      loading: false,

      name: this.$route.params.name,
      creator: this.$route.params.creator,

      username: this.$store.state.user.username,
    };
  },

  methods: {
    updateView: function (page) {
      this.view = page;
    },
  },

  created: function () {
    this.loading = true;

    this.axios({
      method: "get",
      url: "authenticate",
    })
      .then(() => {
        // if user does not own recipe
        if (this.creator != this.username) {
          let alert = {
            _title: "Sorry, hier ist ein Fehler!",
            _body: "Du kannst nur deine eigenen Rezepte ändern.",
            isActive: true,
            okFunction: () => {
              this.$store.commit("closeAlert");
            },
            closeFunction: () => {
              this.$store.commit("closeAlert");
            },
          };
          this.$store.commit("showAlert", alert);

          this.$router.replace({ name: "CtlHome" });
        }
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

            this.$router.replace({ name: "CtlHome" });
            break;
          }

          case 401: {
            this.$router.replace({ name: "CtlLogin" });
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

            this.$router.replace({ name: "CtlHome" });
            break;
          }
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  mounted: function () {
    //load and set recipe
    var data = { name: this.name, creator: this.creator };
    this.axios({
      method: "post",
      url: "get_recipe",
      data: data,
    })
      .then((response) => {
        this.$store.commit("updateRecipeName", response.data.data.name);
        this.$store.commit("updateRecipePersons", response.data.data.persons);
        this.$store.commit("updateRecipeTime", response.data.data.time);
        this.$store.commit(
          "updateRecipeIngredients",
          response.data.data.ingredients
        );
        this.$store.commit("updateRecipeSteps", response.data.data.steps);
        this.$store.commit("updateRecipeCategory", response.data.data.category);

        //set view
        this.view = CtlS1Edit;
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

            this.$router.replace({ name: "CtlHome" });
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

            this.$router.replace({ name: "CtlHome" });
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

            this.$router.replace({ name: "CtlHome" });
            break;
          }
        }
      });
  },

  unmounted: function () {
    this.$store.commit("resetRecipeData");
  },
};
</script>

<style scoped></style>
