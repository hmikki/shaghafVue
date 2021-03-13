<template>

  <form action="/" class="paymentWidgets" data-brands="VISA MASTER AMEX">
  </form>
</template>


<script>
let checkoutId = sessionStorage.getItem('payment_token');
let url = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+ checkoutId;
import(url);

</script>