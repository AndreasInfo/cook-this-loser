<template>
  <div v-if="!loading" class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Rezept ändern:</div>

      <transition name="fade" mode="out-in">
        <component
          :is="view"
          @previous-page-s1="$router.replace({ name: 'Home' })"
          @next-page-s1="updateView('Step2')"
          @previous-page-s2="updateView('Step1_edit')"
          @next-page-s2="updateView('Step3')"
          @previous-page-s3="updateView('Step2')"
          @next-page-s3="updateView('Step4_edit')"
          @previous-page-s4="updateView('Step3')"
          @next-page-s4="$router.replace({ name: 'Home' })"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import Step1_edit from "../components/steps/Step1_edit.vue";
import Step2 from "../components/steps/Step2.vue";
import Step3 from "../components/steps/Step3.vue";
import Step4_edit from "../components/steps/Step4_edit.vue";

export default {
  name: "Add",

  components: {
    Step1_edit,
    Step2,
    Step3,
    Step4_edit,
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
    updateView: function(page) {
      this.view = page;
    },
  },

  created: function() {
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

          this.$router.replace({ name: "Home" });
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

            this.$router.replace({ name: "Home" });
            break;
          }

          case 401: {
            this.$router.replace({ name: "Login" });
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

            this.$router.replace({ name: "Home" });
            break;
          }
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  mounted: function() {
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
        this.view = Step1_edit;
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

            this.$router.replace({ name: "Home" });
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

            this.$router.replace({ name: "Home" });
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

            this.$router.replace({ name: "Home" });
            break;
          }
        }
      });
  },

  unmounted: function() {
    this.$store.commit("resetRecipeData");
  },
};
</script>

<style scoped></style>
