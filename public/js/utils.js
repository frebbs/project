export function getQuestion() {
    fetch('http://localhost:8080/getquestion')
    .then((data) => {
        return data.json()
    })
    .then((json) => {
        console.log(json)
    })
}