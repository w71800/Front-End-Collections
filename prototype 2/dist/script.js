console.clear()

// 這邊是 sheet 的 ID
var sheetID = "1wsjKUia5KvuUzFjs_97a5tir3583KZXDIuBGvmKYsZQ"
var sheetNum = 1
// 這是 url 的格式
const url = "https://spreadsheets.google.com/feeds/list/" + sheetID +"/" + sheetNum + "/public/values?alt=json";


var vm = new Vue({
  el: "#app",
  data: {
    caseList: [
      {cht:"主格",eng:"NOM"},
      {cht:"屬格",eng:"GEN"},
      {cht:"與格",eng:"DAT"},
      {cht:"受格",eng:"ACC"},
      {cht:"奪格",eng:"ABL"},
      {cht:"呼格",eng:"VOC"}
    ],
    words: {},
    userInput: "",
    inputData: {
      singleInputs: [],
      pluralInputs: []
    },
    inputIsSelected: false,
  },
  computed: {
    currentWord() {
      return this.words[this.userInput] || null;
    },
    status() {
      if (!this.userInput.length) return "使用者未輸入...";
      return this.currentWord ? "找到了，試試看！" : "資料庫中沒找到這個字...";
    },
  },
  created: function(){
    // Vue 物件生成時執行 ajax 取得字彙資料包並處理
    const self = this;
    $.ajax({
    url: url,
    success: function(evt){
      let rawData = evt.feed.entry
      let dicUrl = "http://www.latin-dictionary.net/search/latin/"
      rawData.forEach((item)=>{
        if (!item.gsx$nomsg.$t) return
      self.words[item.gsx$nomsg.$t] = {
          stem: item.gsx$詞幹.$t,
          type: item.gsx$性別.$t,
          declension: item.gsx$變格.$t,
          single: {
            NOM: item.gsx$nomsg.$t,
            GEN: item.gsx$gensg.$t,
            DAT: item.gsx$datsg.$t,
            ACC: item.gsx$accsg.$t,
            ABL: item.gsx$ablsg.$t,
            VOC: item.gsx$vocsg.$t,
          },
          plural: {
            NOM: item.gsx$nompl.$t,
            GEN: item.gsx$genpl.$t,
            DAT: item.gsx$datpl.$t,
            ACC: item.gsx$accpl.$t,
            ABL: item.gsx$ablpl.$t,
            VOC: item.gsx$vocpl.$t,
          },
        }
      })
      },
    })
  },
})
