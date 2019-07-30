var app = new Vue({
  el: "#app",
  data: {
    message: "hello",
    // list: ["りんご", "バナナ", "いちご"]
    num: 1,
    val: true,
    val1: "",
    val2: "Z",
    preview: "",
    name: "キマイラ",
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
      //新しいモンスターを追加
      this.list.push({
        id: max + 1,
        name: this.name,
        hp: this.hp
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
});
