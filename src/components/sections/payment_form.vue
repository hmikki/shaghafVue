<template>
  <form action="{shopperResultUrl}" class="paymentWidgets" data-brands="VISA MASTER AMEX"></form>
</template>
<script src="https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}"></script>

<script>
let checkoutId = sessionStorage.getItem('payment_token');
import 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+ checkoutId;

</script>