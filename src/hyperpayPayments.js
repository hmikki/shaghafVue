
const saveCardToHyperPay = data => {
    var path = "/v1/registrations";
    let cardBrand = Payment.fns.cardType(data.number);
    if (cardBrand == "visa" || cardBrand == "master" || cardBrand == "mada") {
        var cardData = querystring.stringify({
            "authentication.userId": config.HYPERPAY.UserId,
            "authentication.password": config.HYPERPAY.Password,
            "authentication.entityId": config.HYPERPAY.EntityId,
            paymentBrand: cardBrand.toUpperCase(),
            "card.number": data.number || "",
            "card.holder": data.name || "",
            "card.expiryMonth": data.expiryMonth || "",
            "card.expiryYear": data.expiryYear || "",
            "card.cvv": data.cvc || "",
            recurringType: "INITIAL"
        });
        var options = {
            port: 443,
            host: config.HYPERPAY.host,
            path: path,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": cardData.length
            }
        };
        return new Promise((resolve, reject) => {
            try {
                var postRequest = https.request(options, res => {
                    res.setEncoding("utf8");
                    res.on("data", chunk => {
                        jsonRes = JSON.parse(chunk);
                        resolve(jsonRes);
                    });
                });
                postRequest.write(cardData);
                postRequest.end();
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    } else {
        return {
            success: false,
            message: localizationManager.strings.cardNotSupported
        };
    }
};

const oneClickPayment = async (amount, hyperPayId) => {
    try {
        console.log(amount, hyperPayId);
        if (!hyperPayId || !amount || isNaN(parseFloat(amount))) {
            return {
                message: localizationManager.strings.invalidArguments
            };
        }

        var path = "/v1/registrations/" + hyperPayId.toString() + "/payments";
        var cardData = querystring.stringify({
            "authentication.userId": config.HYPERPAY.UserId,
            "authentication.password": config.HYPERPAY.Password,
            "authentication.entityId": config.HYPERPAY.EntityId,
            recurringType: "REPEATED",
            amount: amount,
            currency: config.HYPERPAY.Currency,
            paymentType: config.HYPERPAY.PaymentType,
            merchantTransactionId: "XXX",
            "customer.email": "smeGuy@gmail.com",
            shopperResultUrl: `${
                config.apiHost.includes(":3000") ? "http" : "https"
            }://${config.apiHost}/app/home`
        });
        console.log(cardData);
        var options = {
            port: 443,
            host: config.HYPERPAY.host,
            path: path,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": cardData.length
            }
        };
        return new Promise((resolve, reject) => {
            try {
                var postRequest = https.request(options, res => {
                    res.setEncoding("utf8");
                    res.on("data", async chunk => {
                        jsonRes = JSON.parse(chunk);
                        if (jsonRes.id) {
                            const { status } = await checkPaymentStatus(
                                jsonRes.id
                            );
                            if (status == "ACK") {
                                resolve(jsonRes);
                            } else {
                                reject({
                                    error: "Payment failed",
                                    reason: "Payment declined by the server"
                                });
                            }
                        } else {
                            console.log("JsonRes>>", jsonRes);
                            reject({
                                error: "Payment failed",
                                reason: "Internal Error"
                            });
                        }
                    });
                });
                postRequest.write(cardData);
                postRequest.end();
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    } catch (ex) {
        return ex;
    }
};

const checkPaymentStatus = id => {
    try {
        if (!id) {
            return {
                message: localizationManager.strings.invalidArguments
            };
        }

        var path = "/v1/checkouts/" + id.toString() + "/payment";
        path += "?authentication.userId=" + config.HYPERPAY.UserId;
        path += "&authentication.password=" + config.HYPERPAY.Password;
        path += "&authentication.entityId=" + config.HYPERPAY.EntityId;

        var options = {
            port: 443,
            host: config.HYPERPAY.host,
            path: path,
            method: "GET"
        };
        return new Promise((resolve, reject) => {
            try {
                var postRequest = https.request(options, res => {
                    res.setEncoding("utf8");
                    res.on("data", chunk => {
                        jsonRes = JSON.parse(chunk);
                        let code = jsonRes.result.code;
                        console.log(jsonRes);
                        var patt1 = new RegExp(
                            "^(000.000.|000.100.1|000.[36])"
                        );
                        var patt2 = new RegExp("/^(000.400.0|000.400.100)/");
                        if (patt1.test(code) || patt2.test(code)) {
                            jsonRes["status"] = "ACK";
                        } else {
                            jsonRes["status"] = "NAK";
                        }
                        resolve(jsonRes);
                    });
                });
                postRequest.end();
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    } catch (ex) {
        return ex;
    }
};