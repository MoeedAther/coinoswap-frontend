import axios from "axios";

// This function is used to limit the number of characters in a number
export function limitCharsInNumber(input, length) {
  // Step 1: Convert to string if it's a number
  let value = typeof input === "number" ? input.toString() : input;

  // Step 2: Trim the string to a maximum of 15 characters (including decimal point)
  value = value.slice(0, length);

  return value;
}

// Limitinng number to 15 characters
export function formatTo15Chars(input, length) {
  // Step 1: Convert to string if it's a number
  let value = typeof input === "number" ? input.toString() : input;

  // Step 2: Trim the string to a maximum of 15 characters (including decimal point)
  value = value.slice(0, length);
  return value;
}

// Function for limiting digits of number
export function formatCharsToSpecificLength(input, length) {
  // Step 1: Convert to string if it's a number
  let value = typeof input === "number" ? input.toString() : input;

  // Step 2: Trim the string to a maximum of length characters (including decimal point)
  value = value.slice(0, length);
  return value;
}

export function standerdiseStatus(status) {
  // Standard statuses in steps
  // Step1: "waiting"
  // Step2: "confirming"
  // Step3: "exchanging"
  // Step4: "finished"
  // Step5: "failed"
  // Step6: "refunded"
  // Step7: "overdue"
  // Step8: "unknown"

  if (
    status === "new" ||
    status === "waiting" ||
    status === "wait" ||
    status === "Awaiting Deposit"
  ) {
    return "waiting";
  } else if (
    status === "confirming" ||
    status === "confirmation" ||
    status === "confirmed" ||
    status === "Confirming Deposit"
  ) {
    return "confirming";
  } else if (
    status === "exchanging" ||
    status === "sending" ||
    status === "sending_confirmation" ||
    status === "Exchanging" ||
    status === "Sending"
  ) {
    return "exchanging";
  } else if (
    status === "finished" ||
    status === "success" ||
    status === "Complete"
  ) {
    return "finished";
  } else if (status === "failed" || status === "error" || status === "Failed") {
    return "failed";
  } else if (status === "refunded" || status === "Refund") {
    return "refunded";
  } else if (
    status === "overdue" ||
    status === "expired" ||
    status === "Request Overdue"
  ) {
    return "overdue";
  } else {
    return "unknown";
  }
}

export function removeTextInBrackets(str) {
  return str.replace(/\s*\([^)]*\)/g, "").trim();
}

// This function takes coin object then performs below logic to check wether coin requires an extra id or not
export function combinedTrueElseFalse(coin) {
  let obj = JSON.parse(coin.exchanges);
  let noOfTrue = [];
  let noOfFalse = [];

  if (obj.changenow.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.changehero.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.exolix.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.easybit.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.letsexchange.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.godex.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.stealthex.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (obj.simpleswap.requiresExtraId) {
    noOfTrue.push(true);
  } else {
    noOfFalse.push(false);
  }

  if (noOfTrue.length > noOfFalse.length) {
    return true;
  } else {
    return false;
  }
}

// This function is responsible for fetching coin object from approved coins
export async function fetchCoin(coinObj) {
  return new Promise(async (resolve, reject) => {
    try {
      const url =
        process.env.REACT_APP_URL +
        "/search_coin" +
        `?_=${new Date().getTime()}`;
      const response = await axios.post(url, {
        shortName: coinObj.name,
        network: coinObj.network,
      });

      const result = await response.data;

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// This function is responsible for performing smoth scroll to target element upon coin type selection in coins dropdown
export const handleScrollToElement = (elementId) => {
  // Prevent the default anchor behavior
  const dropdownContent = document.querySelector(".scrollable-dropdown");
  const targetElement = document.getElementById(elementId);

  if (dropdownContent && targetElement) {
    const targetTop = targetElement.offsetTop;
    const dropdownScrollTop = dropdownContent.scrollTop;
    const dropdownHeight = dropdownContent.offsetHeight;

    // Calculate if the target element is out of view within the dropdown
    if (
      targetTop < dropdownScrollTop ||
      targetTop > dropdownScrollTop + dropdownHeight
    ) {
      // Align the target element at the top of the dropdown
      dropdownContent.scrollTo({
        top: targetTop - 70,
        behavior: "smooth", // 👈 smooth scroll
      });
    }
  }
};
