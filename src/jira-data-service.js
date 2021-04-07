const { getRequest } = require("./lib/http-client");

const baseUrl = "https://herocoders.atlassian.net/rest/api/3";

//let total, issues = []

function getComponents() {
  const url = `${baseUrl}/project/IC/components`;
  return getRequest({url})
}



/* async function getComponentIssues(component, cb) {
   console.log(component.id)
  const url =`${baseUrl}/search?jql=component%20%3D%20${component.id}%20&maxResults=3&startAt=${issues.length}`
  const res = await getRequest({url})
  total = res.total
  issues = issues.concat(res.issues)
  console.log({total, issu: issues.length})
  if (total !== issues.length) {
    console.log('inside while')
     getComponentIssues(component, () => {})
  }else{
    console.log(cb)
    total = undefined;
    issues = []
  }
  
 
} */

let total, issues = []

async function getData (cb) {
  
 

  const comps = await getComponents()

 async function iterate (index) {      
      if (index === comps.length) {
        return cb()
      }                      
    await getCompoIssues(comps[index], () => {
      total= undefined
      issues = []
      iterate(index + 1)
    })
  }
  iterate(0)                                              

                                          
}



async function getCompoIssues(component, cb) {

  console.log(component.id)
  

  const url =`${baseUrl}/search?jql=component%20%3D%20${component.id}%20&maxResults=3&startAt=${issues.length}`
  const a = await getRequest({url})
   total = a.total
   issues = issues.concat(a.issues)
   console.log(total, issues.length)
   while (total !== issues.length) {
     console.log('whilr here')
      await getCompoIssues(component, () => {})
    
   }
   cb()

}







/* async function getData(cb) {
 const comps = await getComponents()
 await Promise.all(comps.map(c => getComponentIssues(c, () => {})))
} */



(async function () {

  await getData(() => { console.log('Done')})

})()