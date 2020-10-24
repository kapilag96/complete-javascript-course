export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        this.likes = this.likes.filter(el => el.id !== id);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) > -1
    }

    get length(){
        return this.likes.length;
    }
}
