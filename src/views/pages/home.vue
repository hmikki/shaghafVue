<template>

    <!DOCTYPE html>
    <html>
    <head>
        <title>الصفحة الرئيسية</title><!-- site title-->
    </head>

    <body>
    <header_section></header_section>
    <login_section></login_section>
    <forget_password_section></forget_password_section>
    <verification_code_section></verification_code_section>
    <!-- start wrapper -->
    <div class="wrapper">
        <carosel_section></carosel_section>

        <about_section></about_section>

        <services_section></services_section>

        <most_wanted_section></most_wanted_section>

        <said_section></said_section>

        <goals_section></goals_section>

        <contact_section></contact_section>
    </div>
    </body>
    </html>

</template>
<script>

export default {
    mounted() {
        console.log('Home mounted.')
    }
}
</script>
