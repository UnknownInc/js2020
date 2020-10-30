import { makeAutoObservable, observable, runInAction } from "mobx";
import {auth} from '../services/firebase';
import md5 from 'md5';
import Itemservice from '../services/itemservice';
import uuid from 'node-uuid';
export default class Session {

    user = null;
    items = [];
    comments = [];

    constructor(root) {
      this.root=root;
      makeAutoObservable(this, {
        user:observable,
        items: observable,
       });
      auth().onIdTokenChanged(this.idTokenChanged.bind(this));
      auth().setPersistence(auth.Auth.Persistence.LOCAL);
    }

    idTokenChanged(usr) {
      if (usr) {
        usr.getIdToken()
          .then(token=>{
            runInAction(()=>{
              this.idToken=token;
              window.apiAuth = {"Authorization": `Bearer ${this.idToken}`};
              this.user={
                email: usr.email, 
                displayURL:`https://www.gravatar.com/avatar/${md5(usr.email.toLowerCase())}`
              };
              this.refreshItems();
            });
            setTimeout(()=>{
              usr.getIdToken(true);
            }, 30*60*1000);
          },
          (err)=>{
            console.error(err);
          })

      } else {
        runInAction(()=>{
          this.user=null;
        })
      }
    }

    async register(email, password) {
      try {
        runInAction(()=>(this.root.uiState.pendingRequestCount++));
        this.user = null;
        await auth().createUserWithEmailAndPassword(email, password);
        await this.login(email, password);
      } catch(e) {
        console.error(e);
        this.user = null;
        throw e;
      } finally {
        runInAction(()=>(this.root.uiState.pendingRequestCount++));
      }
      
    }

    async login(email, password) {
      try {
        runInAction(()=>(this.root.uiState.pendingRequestCount++));
        this.user = null;
        await auth().setPersistence(auth.Auth.Persistence.LOCAL);
        await auth().signInWithEmailAndPassword(email, password);
      } catch(e) {
        console.error(e);
        this.user = null;
        throw e;
      } finally {
        runInAction(()=>(this.root.uiState.pendingRequestCount--));
      }
    }

    async refreshItems(){
      try{
        runInAction(()=>(this.root.uiState.pendingRequestCount++));
        this.items = await Itemservice.get('all');
      } catch (e) {
        console.error(e);
      } finally {
        runInAction(()=>(this.root.uiState.pendingRequestCount--));
      }
    }

    async refreshComments(){
      try{
        const offset = (this.comments.length)?this.comments[this.comments.length-1].date:new Date(2020,9,1).getTime();
        const newcomments = await Itemservice.getComments(offset+1,10);
        newcomments.forEach(c=>(this.comments.push(c)));
      } catch (e) {
        console.error(e);
      } finally{
      }
    }

    async addComment(comment) {
      try {
        runInAction(()=>(this.root.uiState.pendingRequestCount++));
        const idx=this.items.findIndex(i=>i.id===comment.sessionId);
        if (idx===-1) {
          throw Error('Invalid Session');
        }
        const newComment = {
          id: uuid.v4(),
          sessionId: comment.sessionId,
          email: this.user.email,
          comment: comment.comment,
          createdAt: new Date(),
        };
        console.log('date: '+(new Date().getTime()));
        // this.items[idx].comments.push(newComment);
        Itemservice.addComment(newComment);
        this.refreshItems();
      } catch(e) {
        console.error(e);
      } finally {
        runInAction(()=>(this.root.uiState.pendingRequestCount--));
      }
    }
}