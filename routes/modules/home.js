const express = require('express')
const router = express.Router()

const URL = require("../../models/URL")
const shortenURL = require("../../utils/shortenURL")

//首頁
router.get("/", (req, res) => {
    res.render("index")
})

//轉址
router.post("/", (req, res) => {
    if (!req.body.url) return res.redirect("/")
    const shortURL = shortenURL(5)

    URL.findOne({ originalURL: req.body.url })
        //用originalURL為依據找出一筆資料
        //運用三元運算子判斷資料是否存在，不存在就創一個
        .then(data =>
            data ? data : URL.create({ shortURL, originalURL: req.body.url })
        )
        .then(data =>
            res.render("index", {
                origin: req.headers.origin,
                shortURL: data.shortURL
            })
        )
        .catch(error => console.log(error))
})

//拿到短網址
router.get("/:shortURL", (req, res) => {
    const { shortURL } = req.params
    URL.findOne({ shortURL })
        .lean()
        .then(data => {
            if (!data) {
                return res.render("error")
            }
            res.redirect(data.originalURL)
        })
        .catch(error => console.log(error))
})

module.exports = router
