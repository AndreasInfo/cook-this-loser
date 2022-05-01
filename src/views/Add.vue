<template>
  <div v-if="!loading" class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Rezept hinzufügen:</div>

      <transition name="fade" mode="out-in">
        <component
          :is="view"
          @previous-page-s1="$router.replace({ name: 'Home' })"
          @next-page-s1="updateView('Step2')"
          @previous-page-s2="updateView('Step1_add')"
          @next-page-s2="updateView('Step3')"
          @previous-page-s3="updateView('Step2')"
          @next-page-s3="updateView('Step4_add')"
          @previous-page-s4="updateView('Step3')"
          @next-page-s4="$router.replace({ name: 'Home' })"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import Step1_add from "../components/steps/Step1_add.vue";
import Step2 from "../components/steps/Step2.vue";
import Step3 from "../components/steps/Step3.vue";
import Step4_add from "../components/steps/Step4_add.vue";

export default {
  name: "Add",

  components: {
    Step1_add,
    Step2,
    Step3,
    Step4_add,
  },

  data() {
    return {
      view: "",
      loading: false,
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
    this.view = Step1_add;
  },

  // beforeRouteEnter() {
  // next((vm) => {
  //   var self = vm; // get access to this
  //   self
  //     .axios({ method: "get", url: "authenticate" })
  //     .then()
  //     .catch((error) => {
  //       switch (error.response.status) {
  //         case 400: {
  //           let alert = {
  //             _title: "Sorry, hier ist ein Fehler!",
  //             _body: "Bitte melde dich beim Administrator.",
  //             isActive: true,
  //             okFunction: () => {
  //               self.$store.commit("closeAlert");
  //             },
  //             closeFunction: () => {
  //               self.$store.commit("closeAlert");
  //             },
  //           };
  //           self.$store.commit("showAlert", alert);
  //           return { name: "Home" };
  //           // break;
  //         }
  //         case 401: {
  //           self.$router.replace({ name: "Login" });
  //           return { name: "Authentification" }; // redirect
  //           // break;
  //         }
  //         default: {
  //           let alert = {
  //             _title: "Sorry, hier ist ein Fehler!",
  //             _body: "Es scheint ein Problem mit deinem Internet zu geben.",
  //             isActive: true,
  //             okFunction: () => {
  //               self.$store.commit("closeAlert");
  //             },
  //             closeFunction: () => {
  //               self.$store.commit("closeAlert");
  //             },
  //           };
  //           this.$store.commit("showAlert", alert);
  //           return false; // abort navigation
  //           // break;
  //         }
  //       }
  //     });
  // });
  // },

  unmounted: function() {
    this.$store.commit("resetRecipeData");
  },
};
</script>

<style scoped></style>
