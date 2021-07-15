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
    words: [],
    userInput: "",
    currentWord: {},
    status: "使用者尚未輸入...",
    inputData: {
      singleInputs: [],
      pluralInputs: []
    },
    inputIsSelected: false,
  },
  watch: {
    userInput: function(newInput,oldInput){
      // 從資料包中尋找對應使用者輸入的單數主格，找到了的話並把它放在 currentWord，沒找到則傳回 0 
      vm.currentWord = vm.words.find( word => word.single.NOM == vm.userInput ) || 0
      console.log(vm.currentWord)
      
      // 根據有無找到對應的 currentWord 來決定 status 的顯示
      if(typeof(vm.currentWord) == "object" && vm.currentWord.type != ""){
        vm.status = "找到了，試試看！"
      }else{
        vm.status = "資料庫中沒找到這個字..."
      }
    },
  },
  computed: {
    // 從抓到的 currentWord 中複製對應的答案進去 ansData（單數與複數得答案所構成的 Array）
    ansData: function(){
      // 寫的有點醜，但原理就是從 currentWord 中將答案放到 ansData 屬性中的陣列，再於 HTML 中使用 v-if 和來判斷使用者輸入與答案是否有一樣，一樣者則渲染出勾勾的 icon
      if(vm.currentWord){
        let ansTemp = {
          singleInputs: [],
          pluralInputs: []
        }
        ansTemp.singleInputs = [vm.currentWord.single.NOM,vm.currentWord.single.GEN,vm.currentWord.single.DAT,vm.currentWord.single.ACC,vm.currentWord.single.ABL,vm.currentWord.single.VOC,]
        ansTemp.pluralInputs = [vm.currentWord.plural.NOM,vm.currentWord.plural.GEN,vm.currentWord.plural.DAT,vm.currentWord.plural.ACC,vm.currentWord.plural.ABL,vm.currentWord.plural.VOC,]
        return ansTemp
      }
      else return null
    }
  },
  created: function(){
    // Vue 物件生成時執行 ajax 取得字彙資料包並處理
    $.ajax({
    url: url,
    success: function(evt){
      let dataContainer = []
      let rawData = evt.feed.entry
      let dicUrl = "http://www.latin-dictionary.net/search/latin/"
      rawData.forEach((item)=>{
      let wordData = {
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
        dataContainer.push(wordData)
      })
      vm.words = dataContainer
      },
    })
  },
})



$(".userInput > input").focus(()=>{
  vm.inputIsSelected = true
})
$(".userInput > input").blur(()=>{
  vm.status = "使用者未輸入..."
  vm.inputIsSelected = false
})
