import { db } from "../main";


export function getUsers(){
    console.log("inside getUsers");
    let users = [];

    db.collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                users.push(
                    {
                    email: doc.data().email,
                    userName: doc.data().userName,
                    role: doc.data().role
                    }
                );
            });
            console.log("pushed", users)
        })
        .then(() => {
            console.log("returning", users);
            return users;
        })
}

