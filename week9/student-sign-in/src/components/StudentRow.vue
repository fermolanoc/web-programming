<template>
    <tr v-bind:class="{ present: student.present, absent: !student.present }">
        <td class="px-2">{{ student.name }}</td>
        <td class="px-2">{{ student.starID }}</td>
        <td class="px-2">
            <input
                type="checkbox"
                v-bind:checked="student.present"
                v-on:change="arrivedOrLeft(student, $event.target.checked)"
            />
        </td>
        <td v-show="edit"><img v-on:click="deleteStudent" src="@/assets/delete.png"></td>
    </tr>
</template>

<script>
export default {
    name: 'StudentRow',
    emits: ['student-arrived-or-left', 'delete-student'],
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        arrivedOrLeft(student, present) {
            this.$emit('student-arrived-or-left', student, present)
        },
        deleteStudent() {
            if (confirm(`Delete ${this.student.name}?`)) {
                this.$emit('delete-student', this.student)
            }
        }
    }
    
}
</script>

<style scoped>
.present {
  background-color: #d9e2ec;
}

.absent {
  color: black;
  font-weight: normal;
}

img {
    width: 34px;
}
</style>