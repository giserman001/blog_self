import marked from 'marked'
import hljs from 'highlight.js'

// 防止xss攻击
import xss from 'xss'
// 将md语法转化html语法

export const translateMarkdown = (plainText, isGuardXss = false) => {
    return marked(isGuardXss ? xss(plainText) : plainText, {
        renderer: new marked.Renderer(),
        gfm: true, // 	If true, use approved GitHub Flavored Markdown (GFM) specification.
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function(code) {
        return hljs.highlightAuto(code).value
        }
    })
}

// 取数组中的随机数
export const random = arr => Math.floor(Math.random() * arr.length)




// 计算评论数
export const getCommentsCount = (commentList) => {
    let count = commentList.length
    commentList.forEach(item => {
        count += item.replies.length
    })
}