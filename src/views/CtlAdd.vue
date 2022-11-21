<template>
  <div v-if="!loading" class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Rezept hinzufügen:</div>

      <transition name="fade" mode="out-in">
        <component
          :is="view"
          @previous-page-s1="$router.replace({ name: 'CtlHome' })"
          @next-page-s1="updateView('CtlS2')"
          @previous-page-s2="updateView('CtlS1Add')"
          @next-page-s2="updateView('CtlS3')"
          @previous-page-s3="updateView('CtlS2')"
          @next-page-s3="updateView('CtlS4Add')"
          @previous-page-s4="updateView('CtlS3')"
          @next-page-s4="$router.replace({ name: 'CtlHome' })"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import CtlS1Add from "../components/steps/CtlS1Add.vue";
import CtlS2 from "../components/steps/CtlS2.vue";
import CtlS3 from "../components/steps/CtlS3.vue";
import CtlS4Add from "../components/steps/CtlS4Add.vue";

export default {
  name: "CtlAdd",

  components: {
    CtlS1Add,
    CtlS2,
    CtlS3,
    CtlS4Add,
  },

  data() {
    return {
      view: "",
      loading: false,
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

  mounted: function () {
    this.view = CtlS1Add;
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

  unmounted: function () {
    this.$store.commit("resetRecipeData");
  },
};
</script>

<style scoped></style>
