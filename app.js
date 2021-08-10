import firebase from  'firebase/app'
import 'firebase/storage'
import {upload} from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyCLH4mw2--xRje73J55L2AO3geaduYt3-4",
    authDomain: "openfile01-500aa.firebaseapp.com",
    projectId: "openfile01-500aa",
    storageBucket: "openfile01-500aa.appspot.com",
    messagingSenderId: "484878755196",
    appId: "1:484878755196:web:6449a6752eb78b8edab0f9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    accept: ['.png', '.jpg', '.jpeg'],
    onUpload(files, blocks) {
        files.forEach((file,index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                // const block = blocks[index].querySelector(`.preview-info-progress`)
                // block.textContent = percentage
                // block.style.width = percentage
            }, error =>  {
                console.log(error)
            }, () => {
                console.log('Complete')
            })
        })
    }
})

