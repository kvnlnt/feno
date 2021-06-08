(() => {
  // src/entities/MoodEntity.ts
  var MoodEntity = class {
    constructor({types, newType, deleteType}) {
      this.types = types;
      this.newType = newType;
      this.deleteType = deleteType;
    }
    serializeJson() {
      return JSON.stringify({
        types: this.types,
        newType: this.newType,
        deleteType: this.deleteType
      });
    }
  };

  // src/lib/hyperscript.ts
  var NamespaceEnum;
  (function(NamespaceEnum2) {
    NamespaceEnum2["xhtml"] = "http://www.w3.org/1999/xhtml";
    NamespaceEnum2["svg"] = "http://www.w3.org/2000/svg";
  })(NamespaceEnum || (NamespaceEnum = {}));
  var H = {};
  function Hyperscript({tag, attrs = [], children = []}, namespace = NamespaceEnum.xhtml) {
    const h2 = document.createElementNS(namespace, tag);
    attrs.forEach(([k, v]) => {
      if (v === void 0 || v === null)
        return;
      if (typeof v === "function") {
        const eventName = k.replace(/^on(.*)/, "$1");
        h2.addEventListener(eventName, (e) => v(e));
      } else {
        h2.setAttribute(k, v.toString());
      }
      if (k === "id")
        H[v] = h2;
    });
    children.forEach((child) => {
      if (child instanceof Node)
        h2.appendChild(child);
      if (typeof child === "string")
        h2.innerHTML += child;
    });
    return h2;
  }
  function h(tag, ...attrs) {
    return (...children) => Hyperscript({tag, attrs, children});
  }

  // src/lib/dom.ts
  var dom = (tag = "div", contents = null) => {
    const el = h(tag)(contents);
    const clear = () => el.innerHTML = "";
    const swap = (contents2) => {
      clear();
      el.appendChild(contents2);
    };
    return {el, swap, clear};
  };

  // src/elements/Typography.ts
  var H1 = (text, ...attrs) => h("h1", ...attrs)(text);
  var H2 = h("h2");
  var H3 = h("h3");
  var P = h("p");
  var Title = h("div");

  // src/elements/Shells.ts
  var ShellMain = ({menu, content}) => h("div", [
    "style",
    [
      "display:grid",
      'grid-template-areas: "menu" "content"',
      "grid-template-rows: min-content auto",
      "grid-template-columns: auto"
    ].join(";")
  ])(h("div", ["style", "grid-area: menu"])(menu), h("div", ["style", "grid-area: content"])(content));

  // src/elements/Menus.ts
  var MainMenuItem = (href, text) => h("a", ["href", href], ["style", ""])(text);
  var MainMenu = () => h("div", [
    "style",
    ["display:flex", "justify-content:space-evenly", "padding:20px;"].join(";")
  ])(MainMenuItem("", "Start"), MainMenuItem("/#/types", "Types"), MainMenuItem("/#/atoms", "Atoms"), MainMenuItem("/#/elements", "Elements"), MainMenuItem("/#/components", "Components"));

  // src/elements/Buttons.ts
  var FlyButton = ({text, onClick}) => h("button", ["onclick", onClick])(text);

  // src/elements/Forms.ts
  var Form = h("form", ["onsubmit", (e) => e.preventDefault()], [
    "style",
    [
      "display:flex",
      "justify-content:center",
      "align-items:center",
      "height:100%",
      "flex-direction:column"
    ].join(";")
  ]);
  var Fieldset = h("fieldset", ["style", "display:block; border:0;"]);
  var Field = h("div", ["style", "display:block; margin-bottom:10px"]);
  var Label = h("label", ["style", "display:block;"]);
  var Legend = h("legend", [
    "style",
    "display:block; margin-bottom:10px;"
  ]);
  var TextInput = ({value, onInput, placeholder}) => h("input", ["type", "text"], ["style", "display:block"], ["value", value], ["oninput", onInput], ["placeholder", placeholder])();

  // src/lib/store.ts
  var Store = (name, initialValues, storage = localStorage) => {
    const get = (k = null) => {
      const store = storage.getItem(name) ? JSON.parse(storage.getItem(name)) : {};
      if (!k)
        return store;
      return store[k];
    };
    const set = (newValues) => {
      const update = {...get(), ...newValues};
      const str = JSON.stringify(update);
      storage.setItem(name, str);
    };
    if (initialValues && !storage.getItem(name))
      set(initialValues);
    return {
      name,
      get,
      set
    };
  };

  // src/lib/string.ts
  var slugify = (text) => {
    return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  // src/components/forms/ThemeFormComponent.ts
  var state = Store("ThemeFormComponent", {
    fsm: "clean"
  });
  var ThemeFormComponent = ({
    name,
    prefix,
    onNameChange,
    onPrefixChange,
    onSubmit
  }) => {
    return Form(Fieldset(Legend("Theme"), Field(Label("Name"), TextInput({
      value: name,
      onInput: (e) => {
        state.set({fsm: "dirty"});
        onNameChange(e.target.value);
      }
    })), Field(Label("Prefix"), TextInput({
      value: prefix,
      onInput: (e) => {
        state.set({fsm: "dirty"});
        const target = e.target;
        const val = slugify(target.value);
        target.value = val;
        onPrefixChange(val);
      }
    }))), Fieldset(FlyButton({
      text: "Define Types",
      onClick: onSubmit
    })));
  };

  // src/stores.ts
  var States;
  (function(States2) {
    States2["App"] = "App";
    States2["Theme"] = "Theme";
    States2["Moods"] = "Moods";
  })(States || (States = {}));
  var appState = Store(States.App, {
    theme: {
      name: "Night",
      prefix: "ngt"
    }
  });
  var themeState = Store(States.Theme, {
    name: "Night",
    prefix: "ngt"
  });
  var moodState = Store(States.Moods, {
    types: ["happy", "calm", "cautious", "alarmed"],
    newType: "",
    deleteType: "",
    test: {
      one: "one",
      two: "two"
    }
  });

  // src/routes.ts
  var typesRoute = () => "/types";

  // src/pages/StartPage.ts
  var StartPage = () => {
    return ShellMain({
      menu: MainMenu(),
      content: h("div")(H1("Feno", ["id", "test"]), H2("Live in style"), P("If you want your app age with style it's going to need a good pair of genes"), ThemeFormComponent({
        name: themeState.get("name"),
        prefix: themeState.get("prefix"),
        onNameChange: (name) => {
          themeState.set({name});
        },
        onPrefixChange: (prefix) => themeState.set({prefix}),
        onSubmit: () => {
          appState.set({
            theme: {
              name: themeState.get("name"),
              prefix: themeState.get("prefix")
            }
          });
          window.location.hash = typesRoute();
        }
      }))
    });
  };

  // src/elements/Boxes.ts
  var BoxRow = h("div", ["style", "display:flex; flex-direction:row;"]);
  var BoxColumn = h("div", [
    "style",
    "display:flex; flex-direction:column;"
  ]);
  var Space = h("div", ["style", "margin:5px"]);

  // src/pages/Types/views.ts
  var MoodInput = ({value, onInput}) => TextInput({
    value,
    onInput: (e) => {
      const target = e.target;
      target.value = slugify(target.value);
      onInput(target.value);
    }
  });
  var MoodList = ({moods, onDelete}) => Field(...moods.map((t) => BoxRow(FlyButton({
    text: "X",
    onClick: () => onDelete(t)
  }), Space(), Title(t))));
  var Shell = ({moodInput, moodList, onAdd}) => ShellMain({
    menu: MainMenu(),
    content: h("div")(H1("Feno", ["id", "test"]), H2("Types"), BoxRow(Form(Fieldset(Legend("Moods"), Field(BoxRow(moodInput.el, FlyButton({
      text: "+",
      onClick: onAdd
    }))), moodList.el))), FlyButton({
      text: "Define Atoms",
      onClick: () => {
      }
    }))
  });

  // src/pages/Types/fsm.ts
  var Types = class {
    constructor({root, fsm = "EntryAction", moodStore}) {
      this.moodInput = dom();
      this.moodList = dom();
      this.root = root;
      this.moodStore = moodStore;
      this.onAdd = this.onAdd.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.machine(fsm);
    }
    machine(fsm) {
      switch (fsm) {
        case "RefreshView":
          this.renderMoodInput();
          this.renderMoodList();
          break;
        case "EntryAction":
          this.renderShell();
          this.machine("RefreshView");
          break;
        case "AddAction":
          this.onAdd();
          this.machine("RefreshView");
          break;
        case "DeleteAction":
          this.onDelete();
          this.machine("RefreshView");
          break;
      }
    }
    onAdd() {
      const update = [...moodState.get("types"), moodState.get("newType")];
      moodState.set({
        types: update,
        newType: ""
      });
    }
    onDelete() {
      moodState.set({
        types: moodState.get("types").filter((type) => moodState.get("deleteType") !== type)
      });
    }
    renderMoodInput() {
      this.moodInput.swap(MoodInput({
        value: moodState.get("newType"),
        onInput: (value) => moodState.set({
          newType: value
        })
      }));
    }
    renderMoodList() {
      this.moodList.swap(MoodList({
        moods: moodState.get("types"),
        onDelete: (value) => {
          moodState.set({deleteType: value});
          this.machine("DeleteAction");
        }
      }));
    }
    renderShell() {
      this.root.swap(Shell({moodInput: this.moodInput, moodList: this.moodList, onAdd: () => this.machine("AddAction")}));
    }
  };

  // src/app.ts
  var render = (root) => {
    const route = window.location.hash.replace("#", "");
    if (route === "")
      root.swap(StartPage());
    if (route === "/types")
      new Types({
        root,
        moodStore: new MoodEntity({
          types: ["happy", "calm", "cautious", "alarmed"],
          newType: "",
          deleteType: ""
        })
      });
  };
  window.addEventListener("DOMContentLoaded", () => {
    const root = dom();
    document.querySelector("#root").appendChild(root.el);
    window.addEventListener("hashchange", () => render(root));
    render(root);
  });
})();
