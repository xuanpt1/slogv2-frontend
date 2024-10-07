import request from "@/router/axios.js";

export function fetchAllArticles(){
    return request.get('/api/v1/getAllArticle')
}

export function fetchArticleListInfo(){
    return request.get('/api/v1/articleList')
}

export function fetchArticlesByPage(page){
    return request.post('/api/v1/articleList',page)
}

export function fetchArticleById(id){
    // let data = {
    //     cid:id
    // }
    return request.get('/api/v1/article/'+id)
}

export function clickArticleOnce(id){
    let data = {
        cid:id
    }
    return request.post('/api/blogContents/getClicksIncrease',data)
}

export function fetchHotArticles(){
    return request.get('/api/blogContents/getHotContents')
}

//数组，传入，dozo
export function fetchArticleByTags(tagList){
    let data = tagList
    return request.post('/api/blogContents/getContentsAbsByMetaId',data)
}

export function fetchCommentsById(id){
    let data = {
        cid:id
    }
    return request.post('/api/blogComments/getCommentsByCid',data)
}

export function sendComment(blogComment){
    let data = blogComment

    return request.post('/api/blogComments/saveComment',data)
}

export function getLiked(coid){
    let data = {
        coid:coid
    }
    return request.post('/api/blogComments/getLiked',data)
}

export function getDisiked(coid){
    let data = {
        coid:coid
    }
    return request.post('/api/blogComments/getDisliked',data)
}

export function fetchGroups(){
    return request.get('/api/blogGroups/getAllGroups')
}

export function fetchGroupDataById(groupId){
    let data = {
        groupId:groupId
    }
    return request.post('/api/blogGroups/getGroupContentsByGroupId',data)
}
