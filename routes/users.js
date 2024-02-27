const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
  //res.send(JSON.stringify({users}, null, 4))//This line is to be replaced with actual return value
});

// GET users with a particular lastname

/* router.get("/lastname/:lastName", (req,res) => {
  const ln = req.params.lastName;
  let ln_users = users.filter((user) => user.lastName === ln)
  res.send(ln_users)
}); */

    // GET users with a particular Last Name eg. 'Smith'
    router.get("/lastName/:lastName",(req,res)=>{
      const lastName = req.params.lastName;
      let filtered_lastname = users.filter((user) => user.lastName === lastName);
      res.send(filtered_lastname);
  });

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email)
  res.send(filtered_users)//This line is to be replaced with actual return value
});

//code snippet below sorts the user list and logs to the console
function getDateFromString(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}

router.get("/sort",(req,res) =>{
  let sorted_users = users.sort(function(a,b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
      return d1-d2;
  })
  res.send(sorted_users);
});



// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"email":req.query.email,"DOB":req.query.DOB});
  //res.send("firstName: " + req.query.firstName + "lastName: " + req.query.lastName + "email: " + req.query.email + "DOB: " + req.query.DOB);
  res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")
  //res.send("hello")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let DOB = req.query.DOB;
    if (DOB) {
      filtered_user.DOB =DOB
    }
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`User with email ${email} updated.`);
  }
  else {
    res.send("Unable to find user")
  }
  //This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`)//This line is to be replaced with actual return value
});

module.exports=router;
