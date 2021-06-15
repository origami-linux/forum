import { firebaseConf } from "/js/conf.js";
import { Params } from "/js/params.js"

firebase.initializeApp(firebaseConf);
const db = firebase.firestore();
// firebase.analytics();

document.querySelector("#menubtn").onclick = function()
{
    window.location.href = location.protocol + "//" + location.host + "/";
};

const params = new Params(window.location.search);
const uid = params.get("id");

if(uid == null || uid == "")
{
    console.log("No such user!");
    window.location.href = location.protocol + "//" + location.host + "/404.html";
}

const udata = db.collection("udata");
udata.doc(uid).get().then((user) =>
{
    if(!user.exists)
    {
        console.log("No such user!");
        window.location.href = location.protocol + "//" + location.host + "/404.html";
    }

    firebase.storage().ref(uid + "/pfp.png").getDownloadURL().then((url) =>
    {
        document.querySelector("#pfp").src = url;
    })
    .catch((error) =>
    {
        console.log("Error getting pfp:", error);
    });

    document.querySelector("#uname").innerHTML = user.data().uname;

    const privs = db.collection("privs");
    privs.doc(user.data().privilegeId.toString()).get().then((priv) =>
    {
        if(!priv.exists)
            return;

        document.querySelector("#pfp").style = "border: 4px solid rgb(" + priv.data().col[0] + "," + priv.data().col[1] + "," + priv.data().col[2] + ");";
        document.querySelector("#pname").innerHTML = priv.data().pname;
        document.querySelector("#pname").style = "color: rgb(" + priv.data().col[0] + "," + priv.data().col[1] + "," + priv.data().col[2] + ");";
    })
    .catch((error) =>
    {
        console.log("Error getting documents: ", error);
    });

    document.querySelector("#quote").innerHTML = "“" + user.data().quote + "”";
    document.querySelector("#desc").innerHTML = user.data().desc;
})
.catch((error) =>
{
    console.log("Error getting documents: ", error);
});
