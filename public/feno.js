(() => {
  // src/adaptors/config.ts
  var ROOT = "page";
  var BREAKPOINTS;
  (function(BREAKPOINTS2) {
    BREAKPOINTS2[BREAKPOINTS2["MOBILE"] = 0] = "MOBILE";
    BREAKPOINTS2[BREAKPOINTS2["TABLET"] = 720] = "TABLET";
  })(BREAKPOINTS || (BREAKPOINTS = {}));
  var PAGES;
  (function(PAGES2) {
    PAGES2["HOME"] = "home";
    PAGES2["DESIGN"] = "design";
  })(PAGES || (PAGES = {}));
  var LOCAL_STORAGE;
  (function(LOCAL_STORAGE2) {
    LOCAL_STORAGE2["THEME"] = "theme";
  })(LOCAL_STORAGE || (LOCAL_STORAGE = {}));

  // src/application/design/styles/Palette.ts
  var palette = {
    black_100: "rgba(0,0,0,1)",
    black_90: "rgba(0,0,0,0.9)",
    black_80: "rgba(0,0,0,0.8)",
    black_70: "rgba(0,0,0,0.7)",
    black_60: "rgba(0,0,0,0.6)",
    black_50: "rgba(0,0,0,0.5)",
    black_40: "rgba(0,0,0,0.4)",
    black_30: "rgba(0,0,0,0.3)",
    black_20: "rgba(0,0,0,0.2)",
    black_10: "rgba(0,0,0,0.1)",
    black_09: "rgba(0,0,0,0.09)",
    black_08: "rgba(0,0,0,0.08)",
    black_07: "rgba(0,0,0,0.07)",
    black_06: "rgba(0,0,0,0.06)",
    black_05: "rgba(0,0,0,0.05)",
    black_04: "rgba(0,0,0,0.04)",
    black_03: "rgba(0,0,0,0.03)",
    black_02: "rgba(0,0,0,0.02)",
    black_01: "rgba(0,0,0,0.01)",
    white_100: "rgba(255,255,255,1)",
    white_90: "rgba(255,255,255,0.9)",
    white_80: "rgba(255,255,255,0.8)",
    white_70: "rgba(255,255,255,0.7)",
    white_60: "rgba(255,255,255,0.6)",
    white_50: "rgba(255,255,255,0.5)",
    white_40: "rgba(255,255,255,0.4)",
    white_30: "rgba(255,255,255,0.3)",
    white_20: "rgba(255,255,255,0.2)",
    white_10: "rgba(255,255,255,0.1)",
    white_09: "rgba(255,255,255,0.09)",
    white_08: "rgba(255,255,255,0.08)",
    white_07: "rgba(255,255,255,0.07)",
    white_06: "rgba(255,255,255,0.06)",
    white_05: "rgba(255,255,255,0.05)",
    white_04: "rgba(255,255,255,0.04)",
    white_03: "rgba(255,255,255,0.03)",
    white_02: "rgba(255,255,255,0.02)",
    white_01: "rgba(255,255,255,0.01)"
  };

  // src/application/design/styles/Theme.ts
  var Themes = {
    dark: "dark",
    light: "light"
  };
  var style = (...styleList) => {
    const filteredStyles = styleList.filter((item) => item.slice(1, item.length).every((check) => check));
    const keys = filteredStyles.map((item) => item[0]);
    const values = keys.map((s) => palette[s]).join(";");
    return values;
  };
  var isTheme = (theme) => theme === getTheme();
  var getTheme = () => localStorage.getItem(LOCAL_STORAGE.THEME);
  var setTheme = (theme) => {
    Object.entries(Themes).forEach(([k]) => document.body.classList.remove(k));
    localStorage.setItem(LOCAL_STORAGE.THEME, theme);
    document.body.classList.add(theme);
  };
  var Theme = (theme = "dark") => {
    const body = document.body;
    body.style.margin = "0px";
    const root = document.createElement("div");
    root.id = ROOT;
    root.style.backgroundColor = style(["black_05", isTheme("light")], ["black_90", isTheme("dark")]);
    root.style.color = style(["black_100", isTheme("light")], ["white_80", isTheme("dark")]);
    root.style.fontFamily = "Arial";
    document.body.appendChild(root);
    setTheme(localStorage.getItem(LOCAL_STORAGE.THEME) || theme);
  };

  // src/application/design/elements/Menus.ts
  var VerticalMenu = (items) => {
    const ul = document.createElement("ul");
    ul.style.backgroundColor = style(["black_10", isTheme("light")], ["black_90", isTheme("dark")]);
    items.forEach(({text, href, isSelected = false}) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.innerText = text;
      a.href = href;
      if (isSelected)
        a.style.fontWeight = "bold";
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  };

  // src/application/design/elements/Logo.ts
  var Logo = () => {
    const logo = document.createElement("a");
    logo.href = "/";
    logo.innerText = "FEDS";
    logo.style.color = style(["black_80", isTheme("light")], ["white_50", isTheme("dark")]);
    logo.style.textDecoration = "none";
    logo.style.padding = "10px 20px";
    logo.style.fontSize = "24px";
    return logo;
  };

  // src/application/util/El.ts
  var NamespaceEnum;
  (function(NamespaceEnum2) {
    NamespaceEnum2["xhtml"] = "http://www.w3.org/1999/xhtml";
    NamespaceEnum2["svg"] = "http://www.w3.org/2000/svg";
  })(NamespaceEnum || (NamespaceEnum = {}));
  function EL({tag, attrs = [], children = []}, namespace = NamespaceEnum.xhtml) {
    const el2 = document.createElementNS(namespace, tag);
    attrs.forEach(([k, v]) => {
      if (typeof v === "function") {
        el2.addEventListener(k.substring(2, k.length), (e) => v(e));
      } else {
        el2.setAttribute(k, v.toString());
      }
    });
    children.forEach((child) => {
      if (child instanceof Node)
        el2.appendChild(child);
      if (typeof child === "string")
        el2.innerHTML += child;
    });
    return el2;
  }
  function el(tag, ...attrs) {
    return (...children) => EL({tag, attrs, children});
  }

  // src/application/design/styles/Css.ts
  function css(selector, ...props) {
    return `
.${selector} { ${props.filter((prop) => prop[2] === false ? false : true).map(([property, value]) => `${property.replace(/([A-Z])/g, "-$1").toLowerCase()}:${value};`).join(" ")} }`;
  }

  // src/application/design/elements/Navigation.ts
  var ClassName;
  (function(ClassName2) {
    ClassName2["wrapper"] = "wrapper";
    ClassName2["link"] = "link";
  })(ClassName || (ClassName = {}));
  var style2 = () => el("style")(css(ClassName.link, ["padding", "20px"], ["display", "inline-flex"], ["textDecoration", "none"], ["color", palette.black_100, isTheme("light")], ["color", palette.white_100, isTheme("dark")]), css(ClassName.link + ":hover", ["backgroundColor", palette.black_10, isTheme("light")], ["backgroundColor", palette.white_10, isTheme("dark")]), css(ClassName.wrapper, ["backgroundColor", palette.black_20, isTheme("light")], ["backgroundColor", palette.white_20, isTheme("dark")]));
  var view = () => el("div", ["class", ClassName.wrapper])(el("a", ["class", ClassName.link], ["href", "?page=home"])("Home"), el("a", ["class", ClassName.link], ["href", "?page=design"])("Design"));
  var SiteNav = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      this.shadowRoot.appendChild(style2());
      this.shadowRoot.appendChild(view());
    }
  };

  // src/application/design/elements/Pickers.ts
  var ThemePicker = () => {
    const selectedItem = localStorage.getItem(LOCAL_STORAGE.THEME);
    const select = document.createElement("select");
    function handleChange() {
      let val;
      if (this.value === "light")
        val = "light";
      if (this.value === "dark")
        val = "dark";
      setTheme(val);
      window.location.reload();
    }
    select.addEventListener("change", handleChange);
    const optionLight = document.createElement("option");
    optionLight.innerText = "light";
    optionLight.value = "light";
    optionLight.selected = selectedItem === "light";
    select.appendChild(optionLight);
    const optionDark = document.createElement("option");
    optionDark.value = "dark";
    optionDark.innerText = "dark";
    optionDark.selected = selectedItem === "dark";
    select.appendChild(optionDark);
    return select;
  };

  // src/application/design/elements/Typography.ts
  var H1 = (text) => {
    const el2 = document.createElement("h1");
    el2.innerText = text;
    return el2;
  };

  // src/application/design/elements/Shells.ts
  var DashboardShell = ({menu, content}) => {
    customElements.define("site-nav", SiteNav);
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateAreas = '"logo user" "nav nav" "menu content"';
    grid.style.gridTemplateRows = "max-content min-content min-content";
    grid.style.gridTemplateColumns = "max-content";
    grid.style.height = "100vh";
    const logo = Logo();
    const logoArea = document.createElement("div");
    logoArea.style.gridArea = "logo";
    logoArea.style.display = "flex";
    logoArea.style.justifyContent = "flex-start";
    logoArea.style.alignItems = "center";
    logoArea.appendChild(logo);
    grid.appendChild(logoArea);
    const user = H1("USER");
    const themePicker = ThemePicker();
    const userArea = document.createElement("div");
    userArea.style.gridArea = "user";
    userArea.style.flexDirection = "row";
    userArea.style.justifyContent = "flex-end";
    userArea.style.display = "flex";
    userArea.style.alignItems = "center";
    userArea.appendChild(themePicker);
    userArea.appendChild(user);
    grid.appendChild(userArea);
    const nav = document.createElement("site-nav");
    const navArea = document.createElement("div");
    navArea.style.gridArea = "nav";
    navArea.appendChild(nav);
    grid.appendChild(navArea);
    const menuArea = document.createElement("div");
    menuArea.style.gridArea = "menu";
    menuArea.appendChild(menu);
    grid.appendChild(menuArea);
    const contentArea = document.createElement("div");
    contentArea.style.gridArea = "content";
    contentArea.appendChild(content);
    grid.appendChild(contentArea);
    return grid;
  };
  var DashboardHomeShell = ({content}) => {
    customElements.define("site-nav", SiteNav);
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateAreas = '"logo user" "nav nav" "content content"';
    grid.style.gridTemplateRows = "max-content min-content min-content";
    grid.style.gridTemplateColumns = "max-content";
    grid.style.height = "100vh";
    const logo = Logo();
    const logoArea = document.createElement("div");
    logoArea.style.gridArea = "logo";
    logoArea.style.display = "flex";
    logoArea.style.justifyContent = "flex-start";
    logoArea.style.alignItems = "center";
    logoArea.appendChild(logo);
    grid.appendChild(logoArea);
    const user = H1("USER");
    const themePicker = ThemePicker();
    const userArea = document.createElement("div");
    userArea.style.gridArea = "user";
    userArea.style.flexDirection = "row";
    userArea.style.justifyContent = "flex-end";
    userArea.style.display = "flex";
    userArea.style.alignItems = "center";
    userArea.appendChild(themePicker);
    userArea.appendChild(user);
    grid.appendChild(userArea);
    const nav = document.createElement("site-nav");
    const navArea = document.createElement("div");
    navArea.style.gridArea = "nav";
    navArea.appendChild(nav);
    grid.appendChild(navArea);
    const contentArea = document.createElement("div");
    contentArea.style.gridArea = "content";
    contentArea.appendChild(content);
    grid.appendChild(contentArea);
    return grid;
  };

  // src/application/pages/DesignSystem.ts
  var DesignSystem = class {
    constructor({section}) {
      this.title = "Design System";
      this.page = document.querySelector(`#${ROOT}`);
      this.section = "buttons";
      this.section = section;
      this.render();
    }
    render() {
      this.page.innerHTML = "";
      const menu = VerticalMenu([
        {
          text: "Boxes",
          href: `?page=${PAGES.DESIGN}&section=boxes`,
          isSelected: this.section === "boxes"
        },
        {text: "Buttons", href: `?page=${PAGES.DESIGN}&section=buttons`, isSelected: this.section === "buttons"},
        {
          text: "Forms",
          href: `?page=${PAGES.DESIGN}&section=forms`,
          isSelected: this.section === "forms"
        },
        {
          text: "Grids",
          href: `?page=${PAGES.DESIGN}&section=grids`,
          isSelected: this.section === "grids"
        },
        {
          text: "Menus",
          href: `?page=${PAGES.DESIGN}&section=menus`,
          isSelected: this.section === "menus"
        },
        {
          text: "Pickers",
          href: `?page=${PAGES.DESIGN}&section=pickers`,
          isSelected: this.section === "pickers"
        },
        {
          text: "Shells",
          href: `?page=${PAGES.DESIGN}&section=shells`,
          isSelected: this.section === "shells"
        },
        {
          text: "Typography",
          href: `?page=${PAGES.DESIGN}&section=typography`,
          isSelected: this.section === "typography"
        }
      ]);
      const content = document.createElement("div");
      content.innerText = this.section;
      this.page.appendChild(DashboardShell({menu, content}));
    }
    static getSectionByString(str) {
      let section = "";
      if (str === "boxes")
        section = "boxes";
      if (str === "buttons")
        section = "buttons";
      if (str === "forms")
        section = "forms";
      if (str === "grids")
        section = "grids";
      if (str === "menus")
        section = "menus";
      if (str === "pickers")
        section = "pickers";
      if (str === "shells")
        section = "shells";
      if (str === "typography")
        section = "typography";
      return section;
    }
  };

  // src/application/pages/Home.ts
  var Home = class {
    constructor({}) {
      this.title = "Homw";
      this.page = document.querySelector(`#${ROOT}`);
      this.render();
    }
    render() {
      this.page.innerHTML = "";
      const content = H1("Home");
      this.page.appendChild(DashboardHomeShell({content}));
    }
  };

  // src/adaptors/router.ts
  var Route = () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page === PAGES.HOME || !page)
      new Home({});
    if (page === PAGES.DESIGN)
      new DesignSystem({section: DesignSystem.getSectionByString(params.get("section"))});
  };

  // src/app.ts
  window.addEventListener("DOMContentLoaded", () => {
    Theme();
    Route();
  });
})();
