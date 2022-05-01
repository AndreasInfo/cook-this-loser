<template>
  <div id="app">
    <aside>
      <ul class="ctl-slideshow">
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
      </ul>

      <div class="pt-2 pl-2 pr-2">
        <a id="logo" href="https://handy-solutions.de">
          <img
            :src="require('@/assets/logo_v2.1_small.svg')"
            alt="Official handy-solutions logo"
            style="max-width: 40px; width: 100%; height: auto"
          />
        </a>
        <div class="is-pulled-right has-text-right">
          <a v-if="!username" @click="$router.push({ name: 'Login' })">Login</a>
          <div v-else>
            <div v-if="username">{{ username }}</div>
            <a v-if="username" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </aside>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <aside>
      <ModalDialog
        :_title="this.$store.state.dialog._title"
        :_body="this.$store.state.dialog._body"
        :isActive="this.$store.state.dialog.isActive"
        :yesFunction="this.$store.state.dialog.yesFunction"
        :noFunction="this.$store.state.dialog.noFunction"
        :closeFunction="this.$store.state.dialog.closeFunction"
      />

      <ModalAlert
        :_title="this.$store.state.alert._title"
        :_body="this.$store.state.alert._body"
        :isActive="this.$store.state.alert.isActive"
        :okFunction="this.$store.state.alert.okFunction"
        :closeFunction="this.$store.state.alert.closeFunction"
      />
    </aside>
  </div>
</template>

<script>
import ModalDialog from "./components/ModalDialog.vue";
import ModalAlert from "./components/ModalAlert";

export default {
  name: "App",

  components: { ModalDialog, ModalAlert },

  computed: {
    username: function() {
      return this.$store.state.user.username;
    },
  },

  methods: {
    logout: function() {
      this.axios({
        method: "get",
        url: "logout",
      })
        .then(() => {
          this.$store.commit("resetUserUsername");
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

  mounted: function() {
    this.axios({
      method: "get",
      url: "get_logged_in_user",
    })
      .then((result) => {
        if (typeof result != "undefined") {
          this.$store.commit("updateUserUsername", result.data.user);
        } else {
          this.$store.commit("updateUserUsername", "");
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

<style lang="scss"></style>
