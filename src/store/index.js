import { createStore } from "vuex";

export default createStore({
  state: {
    user: { username: "" },
    filter: { category: "Alle", creator: "Alle" },
    data: {
      recipe: {
        name: "",
        persons: "",
        time: "",
        category: [],
        ingredients: [],
        steps: [],

        // name: "testname",
        // persons: 3,
        // time: 6,
        // category: "Salat",
        // ingredients: [
        //   { name: "Zitrone", amount: 4, unit: "kg" },
        //   { name: "Orange", amount: 2, unit: "Stück" },
        //   { name: "Zahnpaste", amount: 1, unit: "" },
        // ],
        // steps: [
        //   { id: "", description: "huhu some textitext" },
        //   { id: "", description: "Schritt1" },
        //   { id: "", description: "Das ist zu tun" },
        //   {
        //     id: "",
        //     description:
        //       "Das ist zu tun. Wir wollen einen noch etwas längeren Text, damit wir auch ja alles berücksichtigen. Scheiß responsive Design.",
        //   },
        // ],
      },
    },

    dialog: {
      _title: "",
      _body: "",
      isActive: false,
      yesFunction: () => {},
      noFunction: () => {},
      closeFunction: () => {},
    },

    alert: {
      _title: "",
      _body: "",
      isActive: false,
      okFunction: () => {},
      closeFunction: () => {},
    },
  },
  mutations: {
    showDialog: function(state, dialog) {
      state.dialog._title = dialog._title;
      state.dialog._body = dialog._body;
      state.dialog.isActive = dialog.isActive;
      state.dialog.yesFunction = dialog.yesFunction;
      state.dialog.noFunction = dialog.noFunction;
      state.dialog.closeFunction = dialog.closeFunction;
    },

    showAlert: function(state, alert) {
      state.alert._title = alert._title;
      state.alert._body = alert._body;
      state.alert.isActive = alert.isActive;
      state.alert.okFunction = alert.okFunction;
      state.alert.closeFunction = alert.closeFunction;
    },

    closeAlert: function(state) {
      state.alert.isActive = false;
    },

    closeDialog: function(state) {
      state.dialog.isActive = false;
    },

    updateUserUsername: function(state, username) {
      state.user.username = username;
    },

    resetUserUsername: function(state) {
      state.user.username = "";
    },

    updateRecipeName: function(state, name) {
      state.data.recipe.name = name;
    },

    updateRecipePersons: function(state, persons) {
      state.data.recipe.persons = persons;
    },

    updateRecipeTime: function(state, time) {
      state.data.recipe.time = time;
    },

    updateRecipeCategory: function(state, category) {
      state.data.recipe.category = category;
    },

    updateRecipeIngredients: function(state, ingredients) {
      state.data.recipe.ingredients = ingredients;
    },

    updateRecipeSteps: function(state, steps) {
      state.data.recipe.steps = steps;
    },

    updateFilterCreator: function(state, creator) {
      state.filter.creator = creator;
    },

    updateFilterCategory: function(state, category) {
      state.filter.category = category;
    },

    resetRecipeData: function(state) {
      state.data.recipe.name = "";
      state.data.recipe.persons = "";
      state.data.recipe.time = "";
      state.data.recipe.category = [];
      state.data.recipe.ingredients = [];
      state.data.recipe.steps = [];
    },
  },
  actions: {},
  modules: {},
});
