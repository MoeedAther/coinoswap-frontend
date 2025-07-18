import usa from "../images/language.png";
export const setItem = () => {
  // Newer dropdown local storage variables
  // *************** Start **************
  if (!localStorage.getItem("sendCoin")) {
    localStorage.setItem("sendCoin", null);
  }

  if (!localStorage.getItem("getCoin")) {
    localStorage.setItem("getCoin", null);
  }
  // *************** End ****************
  if (!localStorage.getItem("local_send_index")) {
    localStorage.setItem("local_send_index", 0);
  }

  if (!localStorage.getItem("local_get_index")) {
    localStorage.setItem("local_get_index", 1);
  }

  if (!localStorage.getItem("local_send_amount")) {
    localStorage.setItem("local_send_amount", 0.1);
  }

  if (!localStorage.getItem("local_get_amount")) {
    localStorage.setItem("local_get_amount", 0);
  }

  if (!localStorage.getItem("send_crypto_ticker")) {
    localStorage.setItem("send_crypto_ticker", "btc");
  }

  if (!localStorage.getItem("get_crypto_ticker")) {
    localStorage.setItem("get_crypto_ticker", "eth");
  }

  if (!localStorage.getItem("coin_default_array")) {
    const coinArray = [
      {
        coinindex: 0,
        symbol: "btc",
        isExtraIdSupported: 0,
        popular: true,
        shortname: "btc",
        isstable: false,
        othercoin: false,
        network: "btc",
        networkcolor: "",
        name: "Bitcoin",
        image: "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg",
        chainname1: "",
        chainname2: "",
        symbol2: "Bitcoin",
      },
      {
        coinindex: 1,
        symbol: "eth",
        isExtraIdSupported: 0,
        popular: true,
        shortname: "eth",
        isstable: false,
        othercoin: false,
        network: "eth",
        networkcolor: "rgb(79,173,208)",
        name: "Ethereum",
        image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
        chainname1: "",
        chainname2: "",
        symbol2: "Ethereum",
      },
    ];

    // Convert the array to JSON string before saving it in localStorage
    localStorage.setItem("coin_default_array", JSON.stringify(coinArray));
  }

  if (!sessionStorage.getItem("local_send_index")) {
    sessionStorage.setItem("local_send_index", undefined);
  }

  if (!sessionStorage.getItem("local_get_index")) {
    sessionStorage.setItem("local_get_index", undefined);
  }

  if (!sessionStorage.getItem("local_send_amount")) {
    sessionStorage.setItem("local_send_amount", undefined);
  }

  if (!sessionStorage.getItem("local_get_amount")) {
    sessionStorage.setItem("local_get_amount", undefined);
  }

  if (!sessionStorage.getItem("local_send_crypto_logo")) {
    sessionStorage.setItem("local_send_crypto_logo", undefined);
  }

  if (!sessionStorage.getItem("local_get_crypto_logo")) {
    sessionStorage.setItem("local_get_crypto_logo", undefined);
  }

  if (!sessionStorage.getItem("local_exchange_logo")) {
    sessionStorage.setItem("local_exchange_logo", undefined);
  }

  if (!sessionStorage.getItem("local_exchange_logo_white")) {
    sessionStorage.setItem("local_exchange_logo_white", undefined);
  }

  if (!sessionStorage.getItem("local_exchange_type")) {
    sessionStorage.setItem("local_exchange_type", undefined);
  }

  if (!sessionStorage.getItem("local_send_crypto_name")) {
    sessionStorage.setItem("local_send_crypto_name", undefined);
  }

  if (!sessionStorage.getItem("local_send_crypto_network")) {
    sessionStorage.setItem("local_send_crypto_network", undefined);
  }

  if (!sessionStorage.getItem("local_get_crypto_name")) {
    sessionStorage.setItem("local_get_crypto_name", undefined);
  }

  if (!sessionStorage.getItem("local_get_crypto_network")) {
    sessionStorage.setItem("local_get_crypto_network", undefined);
  }

  if (!sessionStorage.getItem("local_exchange_name")) {
    sessionStorage.setItem("local_exchange_name", undefined);
  }

  if (!sessionStorage.getItem("local_rate_id")) {
    sessionStorage.setItem("local_rate_id", undefined);
  }

  if (!sessionStorage.getItem("local_send_ticker")) {
    sessionStorage.setItem("local_send_ticker", undefined);
  }

  if (!sessionStorage.getItem("local_get_ticker")) {
    sessionStorage.setItem("local_get_ticker", undefined);
  }

  if (!localStorage.getItem("language")) {
    localStorage.setItem("language", usa);
  }

  if (!sessionStorage.getItem("timerValue")) {
    sessionStorage.setItem("timerValue", 0);
  }

  if (!sessionStorage.getItem("timeStamp")) {
    sessionStorage.setItem("timeStamp", 0);
  }

  if (!sessionStorage.getItem("ordertrackerid")) {
    sessionStorage.setItem("ordertrackerid", "");
  }

  if (!sessionStorage.getItem("depositaddress")) {
    sessionStorage.setItem("depositaddress", "");
  }

  if (!sessionStorage.getItem("recipientaddress")) {
    sessionStorage.setItem("recipientaddress", "");
  }

  if (!sessionStorage.getItem("txhash")) {
    sessionStorage.setItem(
      "txhash",
      "0x5f4e4747f1f87594e55b345cb2c3b5a9c7817a07ad8a5bb3dc5f7ed60f46aeb8"
    );
  }

  if (!sessionStorage.getItem("txhashlink")) {
    sessionStorage.setItem("txhashlink", "");
  }

  if (!sessionStorage.getItem("depositstatus")) {
    sessionStorage.setItem("depositstatus", 0);
  }

  if (!sessionStorage.getItem("completionTime")) {
    sessionStorage.setItem("completionTime", "");
  }

  if (!sessionStorage.getItem("completionDate")) {
    sessionStorage.setItem("completionDate", "");
  }

  if (!sessionStorage.getItem("etaTime")) {
    sessionStorage.setItem("etaTime", "11-26 Min");
  }

  if (!sessionStorage.getItem("kyc")) {
    sessionStorage.setItem("kyc", "Not Required");
  }

  if (!sessionStorage.getItem("depositExtraID")) {
    sessionStorage.setItem("depositExtraID", null);
  }

  if (!sessionStorage.getItem("recipientExtraID")) {
    sessionStorage.setItem("recipientExtraID", null);
  }

  if (
    !sessionStorage.getItem("minAmount") ||
    sessionStorage.getItem("minAmount") == 0
  ) {
    sessionStorage.setItem("minAmount", 0.1);
  }
};
