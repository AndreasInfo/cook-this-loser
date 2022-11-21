<template>
  <div>
    <div class="m-4">
      Welche Schritte muss ich befolgen? Bitte Schritt für Schritt eingeben.
    </div>
    <form @submit.prevent="addStep">
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <div class="field">
            <label class="label has-text-left">Schritte:</label>
            <div class="control">
              <textarea
                class="textarea"
                v-model="description"
                placeholder="Beschreibung"
                maxlength="300"
                rows="7"
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" class="button is-info m-3">Hinzufügen</button>
        </div>
      </div>
    </form>

    <div class="columns is-centered is-mobile m-3">
      <div class="column is-narrow">
        <table class="table has-text-left">
          <draggable
            :list="steps"
            item-key="id"
            ghost-class="ghost"
            @change="refreshIds"
          >
            <template #item="{ element }">
              <tr>
                <td>
                  <i class="fas fa-arrows-alt fa-lg"></i>
                </td>

                <td class="">
                  <div class="no-word-break">Schritt {{ element.id }}:</div>
                  <div class="word-break">
                    {{ element.description }}
                  </div>
                </td>

                <td>
                  <i
                    v-on:click="editStep(element.id)"
                    class="fas fa-edit fa-lg has-text-info"
                  ></i>
                </td>
                <td>
                  <i
                    @click="removeStep(element.id)"
                    class="fas fa-times-circle fa-lg has-text-danger"
                  ></i>
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>

    <button
      type="button"
      class="button is-info m-3"
      @click="$emit('previous-page-s3')"
    >
      Zurück
    </button>
    <button type="button" class="button is-info m-3" @click="nextButton">
      Weiter
    </button>
  </div>
</template>

<script>
// source: https://github.com/SortableJS/vue.draggable.next
// source: https://sortablejs.github.io/vue.draggable.next/#/simple
import draggable from "@/../node_modules/vuedraggable";

export default {
  name: "CtlS3",

  components: {
    draggable,
  },

  data() {
    return {
      description: "",

      steps: [...this.$store.state.data.recipe.steps],
    };
  },

  methods: {
    addStep: function () {
      const allowed_word_length = 50;

      // allowed word length for steps's description exeeded
      if (
        this.description.split(" ").filter((word) => {
          return word.length >= allowed_word_length;
        }).length > 0
      ) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: `Bitte verwende keine Wörter mit mehr als ${allowed_word_length} Zeichen.`,
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);

        // add ingredient
      } else {
        this.steps.push({
          description: this.description,
        });

        this.refreshIds();

        this.description = "";

        this.$store.commit("updateRecipeSteps", this.steps);
      }
    },

    removeStep: function (id) {
      this.steps = this.steps.filter((step) => {
        return step.id != id;
      });

      this.refreshIds();

      this.$store.commit("updateRecipeSteps", this.steps);
    },

    editStep: function (id) {
      var edit_step = this.steps.filter((step) => {
        return step.id == id;
      });

      // this.id = edit_step[0].id; // not necessary
      this.description = edit_step[0].description;

      this.removeStep(edit_step[0].id);
    },

    refreshIds: function () {
      for (let index = 0; index < this.steps.length; index++) {
        this.steps[index].id = index + 1;
      }
    },

    nextButton: function () {
      if (this.steps.length == 0) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: `Es gibt kein Rezept ohne etwas zu tun.`,
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
        this.$emit("next-page-s3");
      }
    },
  },

  mounted: function () {
    this.refreshIds();
  },
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
