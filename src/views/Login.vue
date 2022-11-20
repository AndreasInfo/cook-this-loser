<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-5">Bitte logge dich ein:</div>

      <form @submit.prevent="submitForm">
        <div class="columns is-centered is-mobile">
          <div class="column is-narrow">
            <div class="field">
              <label class="label has-text-left">Benutzername</label>
              <div class="control">
                <input
                  class="input"
                  v-model="username"
                  type="text"
                  placeholder="Name"
                  maxlength="50"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label has-text-left">Passwort:</label>
              <div class="control">
                <input
                  class="input"
                  v-model="password"
                  type="password"
                  placeholder="Passwort"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="button is-info m-3"
          @click="$router.push({ name: 'Home' })"
        >
          Zurück
        </button>
        <button type="submit" class="button is-info m-3">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authentification",

  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    submitForm: function () {
      var username = this.username;
      var password = this.password;

      this.axios({
        method: "post",
        url: "login",
        data: { username: username, password: password },
      })
        .then(() => {
          this.$store.commit("updateUserUsername", username);
          this.$router.replace({ name: "Home" });
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
                _body: "Hier stimmt was nicht mit deinen Anmeldedaten.",
                isActive: true,
                okFunction: () => {
                  this.$store.commit("closeAlert");
                },
                closeFunction: () => {
                  this.$store.commit("closeAlert");
                },
              };
              this.$store.commit("showAlert", alert);

              this.username = "";
              this.password = "";
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
  },
};
</script>

<style scoped></style>
