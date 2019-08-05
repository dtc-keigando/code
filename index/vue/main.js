// import Vue from "vue";
// import MarkdownPanel from "./components/MarkdownPanel.vue";
var app = new Vue({
  el: "#app",
  data: {
    valueA: "これは子A",
    valueB: "これは子B",
    message: "hello",
    // list: ["りんご", "バナナ", "いちご"]
    num: 1,
    val: true,
    val1: "",
    val2: "Z",
    preview: "",
    name: "キメラ",
    hp: 600,
    scrollY: 0,
    budget: 300,
    limit: 2,
    timer: null,
    order: false,
    list: [
      { id: 1, name: "スライム", hp: 100 },
      { id: 2, name: "ゴブリン", hp: 200 },
      { id: 3, name: "ドラゴン", hp: 500 }
    ],
    list2: [
      { id: 1, name: "りんご", price: 100 },
      { id: 2, name: "ばなな", price: 200 },
      { id: 3, name: "いちご", price: 400 },
      { id: 4, name: "オレンジ", price: 300 },
      { id: 5, name: "メロン", price: 500 }
    ]
  },
  created: function() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this, handleScroll);
  },
  computed: {
    matched: function() {
      return this.list2.filter(function(el) {
        return el.price <= this.budget;
      }, this);
    },
    sorted: function() {
      return _.orderBy(this.matched, "price", this.order ? "desc" : "asc");
    },
    limited: function() {
      return this.sorted.slice(0, this.limit);
    }
  },
  filters: {
    round: function(val) {
      return Math.round(val * 100) / 100;
    },
    radian: function(val) {
      return (val * Math.PI) / 180;
    }
  },

  // created: function() {
  //   axios
  //     .grt("list.json")
  //     .then(
  //       function(response) {
  //         this.list = response.data;
  //       }.bind(this)
  //     )
  //     .catch(function(e) {
  //       console.error(e);
  //     });
  // },
  methods: {
    doAdd: function() {
      var max = this.list.reduce(function(a, b) {
        return a > b.id ? a : b.id;
      }, 0);
      if (!this.name || !this.hp) {
        return;
      }
      //新しいモンスターを追加
      this.list.push({
        id: max + 1,
        name: this.name.trim(),
        hp: this.hp.trim()
      });
    },
    doRemove: function(index) {
      this.list.splice(index, 1);
    },
    doAttack: function(index) {
      this.list[index].hp -= 10;
    },
    handleClick() {
      var count = this.$refs.count;
      if (count) {
        count.innerText = parseInt(count.innerText, 10) + 1;
      }
    },
    handler: function(comment) {
      console.log(comment);
    },
    handleChange: function(event) {
      var file = event.target.files[0];
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.preview = window.URL.createObjectURL(file);
      }
    },
    handleScroll: function() {
      if (this.timer == null) {
        this.timer = setTimeout(
          function() {
            this.scrollY = window.scrollY;
            clearTimeout(this.timer);
            this.timer = null;
          }.bind(this),
          200
        );
      }
    },
    scrollTop: function() {
      scroll.animateScroll(0);
    }
  },
  mounted: function() {
    console.log(this.$refs.Hello);
  }
  // component: {
  //   MarkdownPanel
  // }
});
Vue.component("my-component", {
  template: "<p>MyComponent</p>"
});
Vue.component("button-counter", {
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});
Vue.component("my-parent", {
  template: "<child v-on:set='do1'></child>",
  data: function() {
    return {
      a: 5
    };
  },
  methods: {
    do1: function() {
      alert("クリックされました");
    }
  }
});
Vue.component("child", {
  template: "<p><button @click='click'>ボタン</button></p>",
  // <p>子コンポーネントis {{val1}} {{val2}}></p>
  props: {
    val1: String,
    val2: Number
  },
  methods: {
    click: function() {
      this.$emit("set");
    }
  }
});

new Vue({
  el: "#components-demo"
});
