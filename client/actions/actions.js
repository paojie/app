import React from 'react'
import {SIGN_IN, SIGN_OUT, RECEIVE_USER, REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_POSTS, SELECT_AUTHOR, FETCH_ITEM} from '../constants'
import 'whatwg-fetch' 
import 'es6-promise'
// 如果有user传入user，没有就是{ }
const recieveUser = (user) => {
    console.log(user);
    return {
        type: RECEIVE_USER,
        user
    }
}

//  异步action，获取用户信息
// 不同于一般同步 action 直接发送 action，异步 action 会回传一个带有 dispatch 参数的 function，里面使用了 Ajax（这里使用 fetch()）进行处理
export function fetchUser () {
    
    const token = localStorage.getItem('token')
    console.log(token);
    if(!token) {   // ！null = true, localStorage 中没有token
        console.log('jb');
        return(dispatch) => {
            console.log('this la st');
            return dispatch(recieveUser({}))   // dispatch   RECEIVE_USER action 
        }
    }
    
    return (dispatch) => {
        // JSON转字符串
        const content = JSON.stringify({
            access_token: token   //名字改成access_token
        })
        return fetch('http://www.fubd.site/api/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res => {
            if(res.ok){       //response对象ok属性，即请求成功），这个属性为true，
                return res.json();  // 返回值转json对象
            } else {
                console.log('获取用户失败')
            }
        }).then(json => {
            console.log('json:' + json);
            
            dispatch(recieveUser(json))  // dispatch   RECEIVE_USER action 携带把处理后的json对象
        })

    }
}


export function logIn(user) {
    return {
        type: SIGN_IN,
        user
    }
}

export function logOut() {
    return {
        type: SIGN_OUT
    }
}


export function selectAuthor(author){
    return {
        type: SELECT_AUTHOR,
        author
    }
}

export function fetchItem(id){
    return dispatch=>{
        return fetch(`http://www.fubd.site/api/detail/?id=${id}`)
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            dispatch(receiveItem(json))  })
        .then(json=>{
            dispatch(receiveItem(json))
        })
    }
}


function receiveItem(json){
    return {
        type: FETCH_ITEM,
        item: json.data
    }
}

// 同步action，返回一个对象，
// function shouldFetchPosts(state,author){
//     if(!state.postsByAuthor[author]){
//         return true;
//     } else {
//         const posts = state.postsByAuthor[author];
//         if(posts.isFetching) {
//             return false;
//         } else {
//             return posts.didInvalidate;
//         }
//     }
// }

// 异步，发出请求action creator
function requestPosts(author){
    return {
        type: REQUEST_POSTS,
        author
    }
}
// 异步，请求成功action creator
function receivePosts(author,json){
    return {
        type: RECEIVE_POSTS,
        author,
        posts: json,
        receivedAt: Date.now()
    }
}
// 异步，请求失败action creator
export function invalidatePosts(author){
    return {
        type: INVALIDATE_POSTS,
        author
    }
}

// 异步·action
export function fetchPosts(author){
    return dispatch=>{
        // 开始fetch
        dispatch(requestPosts(author))
        return fetch(`http://www.fubd.site/api/post?author=${author}`)
            .then(response=>response.json())

            // fetch 成功
            .then(json=>dispatch(receivePosts(author,json)))

            // 这里为什么没有fetch失败做处理。
    }
}

//getState()
//返回应用当前的 state 树。
// export function fetchPostsIfNeeded(author){
//     return (dispatch,getState) => {
//         if(shouldFetchPosts(getState(),author)){ //true
//             return dispatch(fetchPosts(author))
//         }
//     }
// }



