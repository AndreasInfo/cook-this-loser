<template>
  <div>
    <div class="m-4">
      Was muss ich kaufen? Bitte gib die benötigten Zutaten ein.
    </div>
    <form @submit.prevent="addIngredient">
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <div class="field">
            <label class="label has-text-left">Zutat:</label>
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
            <label class="label has-text-left">Menge:</label>
            <div class="control">
              <input
                class="input"
                v-model="amount"
                type="number"
                placeholder="Menge"
                min="0"
                max="9999"
                step="0.05"
              />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-left">Einheit:</label>
            <div class="control">
              <input
                class="input"
                v-model="unit"
                type="text"
                placeholder="Einheit"
                maxlength="10"
              />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="button is-info m-3">Hinzufügen</button>
    </form>

    <div class="columns is-centered is-mobile m-3">
      <div class="column is-narrow">
        <table class="table has-text-left">
          <draggable :list="ingredients" item-key="name" ghost-class="ghost">
            <template #item="{ element }">
              <tr>
                <td>
                  <i class="fas fa-arrows-alt fa-lg"></i>
                </td>

                <!-- version for mobile -->
                <td class="is-hidden-tablet">
                  <div class="no-word-break">
                    {{ element.amount }} {{ element.unit }}
                  </div>
                  <div class="word-break">
                    {{ element.name }}
                  </div>
                </td>

                <!-- version for desktop and bigger -->
                <td class="is-hidden-mobile no-word-break">
                  {{ element.amount }} {{ element.unit }}
                </td>
                <td class="is-hidden-mobile word-break">
                  {{ element.name }}
                </td>

                <td>
                  <i
                    v-on:click="editIngredient(element.name)"
                    class="fas fa-edit fa-lg has-text-info"
                  ></i>
                </td>
                <td>
                  <i
                    @click="removeIngredient(element.name)"
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
      @click="$emit('previous-page-s2')"
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
  name: "CtlS2",

  // display: "Simple", // is part of vuedraggable, not sure what it does

  components: {
    draggable,
  },

  data() {
    return {
      name: "",
      amount: "",
      unit: "",

      ingredients: [...this.$store.state.data.recipe.ingredients], // makes a copy of array
    };
  },

  methods: {
    addIngredient: function () {
      const allowed_word_length = 50;

      // allowed word length for ingredients's name exeeded
      if (
        this.name.split(" ").filter((word) => {
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
      }
      // add ingredient
      else {
        this.ingredients.push({
          name: this.name,
          amount: this.amount,
          unit: this.unit,
        });

        this.name = "";
        this.amount = "";
        this.unit = "";

        this.$store.commit("updateRecipeIngredients", this.ingredients);
      }
    },

    removeIngredient: function (name) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient.name != name;
      });
      this.$store.commit("updateRecipeIngredients", this.ingredients);
    },

    editIngredient: function (name) {
      var edit_ingredient = this.ingredients.filter((ingredient) => {
        return ingredient.name == name;
      });

      this.name = edit_ingredient[0].name;
      this.amount = edit_ingredient[0].amount;
      this.unit = edit_ingredient[0].unit;

      this.removeIngredient(edit_ingredient[0].name);
    },

    nextButton: function () {
      if (this.ingredients.length == 0) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: `Es gibt kein Rezept ohne Zutaten.`,
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
        this.$emit("next-page-s2");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// css for vuedraggable
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

// .not-draggable {
//   cursor: no-drop;
// }
</style>
