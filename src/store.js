import { reactive } from "vue";

export const store = reactive({
    apiUrl: "http://localhost:8000/api/",
    usersApi:"users/",
    storageUrl: "http://localhost:8000/storage/"
})