import { ApiConfig } from "../apiConfig/ApiConfig";
import { ConsoleLogs } from "../../utils/ConsoleLogs";
import { ApiCallDelete, ApiCallPost, ApiCallPut } from "../apiConfig/ApiCall";
import { ApiCallGet } from "../apiConfig/ApiCall";
const TAG = "AuthService";

const AuthService = {
  login: async (email, password) => {
    const { baseUrl, login } = ApiConfig;
    const url = baseUrl + login;
    const params = {
      email_or_phone: email,
      password: password,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  forgotPassword: async (email) => {
    const { baseSecure, newPassword } = ApiConfig;
    const url = baseSecure + newPassword;
    const params = {
      emailId: email,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  transferCoin: async (firstCoin) => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, cpbalancebycoin } = ApiConfig;
    const url = baseWallet + cpbalancebycoin;

    const params = {
      coinName: firstCoin,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getdata: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getdata } = ApiConfig;
    const url = baseUrl + getdata;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getdataverifylist: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getverifyData } = ApiConfig;
    const url = baseUrl + getverifyData;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },
  getdatarejectedlist: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getrejectedData } = ApiConfig;
    const url = baseUrl + getrejectedData;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getkycdata: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getkycData } = ApiConfig;
    const url = baseUrl + getkycData;
    ConsoleLogs("getkycdata", `url: + ${url}`);
    const params = {
      userId: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getverifyidentity: async (id, status, reason) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, verifyIdentity } = ApiConfig;
    const url = baseUrl + verifyIdentity;
    const params = {
      userId: id,
      status: status,
      reason: reason,
    };
    ConsoleLogs(TAG + ", verifyIdentity", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  getrejectIdentity: async (userId, rejectReason) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, rejectIdentity } = ApiConfig;
    const url = baseSecure + rejectIdentity;

    const params = {
      userId: userId,
      reason: rejectReason,
      status: "3",
    };
    ConsoleLogs(TAG + ", rejectIdentity", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getBannerList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, bannerList } = ApiConfig;
    const url = baseUrl + bannerList;
    ConsoleLogs(TAG + ", getBannerList", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getusers: async () => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, getusers } = ApiConfig;
    const url = baseSecure + getusers;

    const params = {};
    ConsoleLogs(TAG + ", getusers", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTotaluser: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getTotaluser } = ApiConfig;
    const url = baseUrl + getTotaluser;
    ConsoleLogs(TAG + ", getTotaluser", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getTotalVerified: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getVerified } = ApiConfig;
    const url = baseUrl + getVerified;
    ConsoleLogs(TAG + ", getVerified", `url : + ${url}`);
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getTotalPending: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getPending } = ApiConfig;
    const url = baseUrl + getPending;
    ConsoleLogs(TAG + ", getPanding", `url : + ${url}`);
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getSupportUser: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getSupport } = ApiConfig;
    const url = baseSecure + getSupport;
    const params = {};
    ConsoleLogs(TAG + ", getSupport", `url : + ${url}`);
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getWithdrawal: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getwithdrawal } = ApiConfig;
    const url = baseSecure + getwithdrawal;
    const params = {};
    ConsoleLogs(TAG + ", getwithdrawal", `url : + ${url}`);
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getNewRegistration: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getregistration } = ApiConfig;
    const url = baseSecure + getregistration;
    const params = {};
    ConsoleLogs(TAG + ", getregistration", `url : + ${url}`);
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  allKycData: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, allkyc } = ApiConfig;
    const url = baseUrl + allkyc;
    const params = {
      userId: userId,
    };
    ConsoleLogs(TAG + ", allkyc", `url : + ${url}`);
    ConsoleLogs(
      TAG + ", allkyc",
      `loginRequestParams : '+ ${JSON.stringify(params)}'`
    );
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  coinlist: async () => {
    const { baseCoin, currencyCoinList } = ApiConfig;
    const url = baseCoin + currencyCoinList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getCurrencyPair: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, currencyPair } = ApiConfig;

    const url = baseSecure + currencyPair;

    const params = {};

    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getSubAdminList: async () => {
    const { baseUrl, getSubAdminList } = ApiConfig;
    const url = baseUrl + getSubAdminList;
    ConsoleLogs("getSubAdminList", `url: + ${url}`);

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getOrderManagement: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getallorder } = ApiConfig;
    const url = baseSecure + getallorder;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddsubAdmin: async (
    firstName,
    lastName,
    signId,
    passwords,
    confirmPassword,
    multipleSelectd
  ) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, AddsubAdmin } = ApiConfig;
    const url = baseUrl + AddsubAdmin;
    const params = {
      first_name: firstName,
      last_name: lastName,
      email_or_phone: signId,
      password: passwords,
      confirm_password: confirmPassword,
      permissions: multipleSelectd,
      admin_type: 0,
    };

    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  addNotify: async (notificationTitle, notification, notificationLink) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, addNotify } = ApiConfig;
    const url = baseUrl + addNotify;
    const params = {
      title: notificationTitle,
      message: notification,
      link: notificationLink,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  deleteNotify: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, deleteNotify } = ApiConfig;
    const url = baseUrl + deleteNotify;
    const params = {
      _id: id
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddBanner: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, Addbanner } = ApiConfig;
    const url = baseUrl + Addbanner;
    ConsoleLogs(TAG + ", getbannerData", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    return ApiCallPost(url, formData, headers);
  },

  updateSubadminList: async (firstName, lastName, email, gander, subadminId, multipleSelectd, adminType) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, updateSubadmin } = ApiConfig;
    const url = baseUrl + updateSubadmin;
    const params = {
      first_name: firstName,
      last_name: lastName,
      email_or_phone: email,
      id: subadminId,
      permissions: multipleSelectd,
      admin_type: adminType,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  AddTrade: async (firstName, lastName, gender, number, email, address) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, AddTrade } = ApiConfig;
    const url = baseSecure + AddTrade;
    const params = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      mobileNumber: number,
      emailId: email,
      line1: address,
    };
    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  deleteSubAdminList: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, subadmindelete } = ApiConfig;
    const url = baseUrl + subadmindelete;
    const params = {
      id: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  cancelOrder: async (orderID, userID) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, cancelOrder } = ApiConfig;
    const url = baseUrl + cancelOrder;
    const params = {
      order_id: orderID,
      userId: userID,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  addVersion: async (version) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, addVersion } = ApiConfig;
    const url = baseUrl + addVersion;
    const params = { version };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleSubadminStatus: async (Id, userId, status) => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, adminsupport } = ApiConfig;
    const url = baseSecure + adminsupport;
    const params = {
      _id: Id,
      userId: userId,
      status: status,
    };
    ConsoleLogs(TAG + ", BannerStatus", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleTradeStatus: async (userId, cell) => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, tradeStatus } = ApiConfig;
    const url = baseSecure + tradeStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    ConsoleLogs(TAG + ", tradeStatus", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getNotificationList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, notificationList } = ApiConfig;
    const url = baseUrl + notificationList;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  IssueList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, helplist } = ApiConfig;

    const url = baseSecure + helplist;

    const params = {};

    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getFiatWithdraw: async () => {
    const { baseUrl, getInrWithrawList } = ApiConfig;
    const url = baseUrl + getInrWithrawList;
    ConsoleLogs("getFiatWithdraw", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  getFiatDeposit: async () => {
    const { baseUrl, inrdepositreq } = ApiConfig;
    const url = baseUrl + inrdepositreq;
    ConsoleLogs("getFiatDeposit", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  handleFundDenied: async (_id, user_id, fee, status, transaction_hash) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, transactionstatus } = ApiConfig;
    const url = baseUrl + transactionstatus;
    const params = { _id, transaction_hash, user_id, status, fee };

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFundApprove: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, transactionstatus } = ApiConfig;
    const url = baseSecure + transactionstatus;
    const params = {
      _id: id,
      status: "approve",
    };
    ConsoleLogs(TAG + ", BannerStatus", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatApprove: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userreqapprove } = ApiConfig;
    const url = baseSecure + userreqapprove;
    const params = {
      transId: id,
      userId: userId,
    };
    ConsoleLogs(TAG + ", BannerStatus", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatDenied: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userreqreject } = ApiConfig;
    const url = baseSecure + userreqreject;
    const params = {
      transId: id,
      userId: userId,
    };
    ConsoleLogs(TAG + ", BannerStatus", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatDApprove: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, confirmInrDeposit } = ApiConfig;
    const url = baseUrl + confirmInrDeposit;
    const params = {
      _id: id,
      status: "APPROVE",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatDrejected: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, rejectInrDeposit } = ApiConfig;
    const url = baseUrl + rejectInrDeposit;
    const params = {
      _id: id,
      status: "CANCELLED",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  addAdTicket: async (message, userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, addAdTicket } = ApiConfig;
    const url = baseHelp + addAdTicket;

    const params = {
      query: message,
      clientId: userId,
      ticketId: id,
    };
    ConsoleLogs(TAG + ", getAddAdTicket", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  ticketList: async (userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, ticketList } = ApiConfig;
    const url = baseHelp + ticketList;

    const params = {
      userId: userId,
      id: id,
    };
    ConsoleLogs(TAG + ", getAddAdTicket", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  sendUsersMail: async (userId, sendMail) => {
    const token = sessionStorage.getItem("token");
    const { baseData, sendmailtouser } = ApiConfig;
    const url = baseData + sendmailtouser;

    const params = {
      userId: userId,
      message: sendMail,
    };
    ConsoleLogs(TAG + ", sendmailtouser", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  uploadDocument: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseData, documentchange } = ApiConfig;
    const url = baseData + documentchange;

    ConsoleLogs(TAG + ", addIdentity", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    return ApiCallPost(url, formData, headers);
  },

  transferhistory: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, transferhistory } = ApiConfig;
    const url = baseUrl + transferhistory;
    const params = {
      userId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  userWallet: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, userWallet } = ApiConfig;
    const url = baseUrl + userWallet;
    const params = {
      userId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleSubadminStatus2: async (userId, cell) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, SubadminStatus } = ApiConfig;
    const url = baseUrl + SubadminStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  coinTransfer: async () => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, getcpcoinbalance } = ApiConfig;
    const url = baseWallet + getcpcoinbalance;

    const params = {};

    ConsoleLogs(TAG + ", getcpcoinbalance", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayRegestration: async () => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, getregistration } = ApiConfig;
    const url = baseSecure + getregistration;

    const params = {};
    ConsoleLogs(TAG + ", getusers", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayDeposit: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, depositrequest } = ApiConfig;
    const url = baseSecure + depositrequest;
    ConsoleLogs("getTodayDeposit", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayWithdraw: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, withdrawlrequest } = ApiConfig;
    const url = baseSecure + withdrawlrequest;
    ConsoleLogs("getTodayWithdraw", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getToalDeposit: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, totaldepositrequest } = ApiConfig;
    const url = baseSecure + totaldepositrequest;
    ConsoleLogs("getToalDeposit", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getToalWithdraw: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, totalwithdrawlrequest } = ApiConfig;
    const url = baseSecure + totalwithdrawlrequest;
    ConsoleLogs("getToalWithdraw", `url: + ${url}`);
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getChangeScreen: async (userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, changeseen } = ApiConfig;
    const url = baseHelp + changeseen;

    const params = {
      clientId: userId,
      chatId: id,
      status: 2,
    };
    ConsoleLogs(TAG + ", getAddAdTicket", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },


  getwalletCoinList: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, walletCoinList } = ApiConfig;
    const url = baseSecure + walletCoinList;
    const params = {
      userId: user_Id,
    };
    ConsoleLogs(TAG + ", walletCoinList", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getAdmincoinaddress: async (coinName, user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, admincoinaddress } = ApiConfig;
    const url = baseSecure + admincoinaddress;
    const params = {
      type: coinName,
      userId: user_Id,
    };
    ConsoleLogs(TAG + ", admincoinaddress", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  addBankAccount: async (
    id,
    bankName,
    accNumber,
    holderName,
    ifsc,
    branchName
  ) => {
    const { baseUrl, addBankAcc } = ApiConfig;
    const url = baseUrl + addBankAcc;
    const params = {
      id: id,
      bank_name: bankName,
      account_number: accNumber,
      holder_name: holderName,
      ifsc: ifsc,
      branch: branchName,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPut(url, params, headers);
  },

  getReceives: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getreceive } = ApiConfig;
    const url = baseSecure + getreceive;
    const params = {
      userId: user_Id,
    };
    ConsoleLogs(TAG + ", getreceive", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getAccDetails: async () => {
    const { baseUrl, getAccDetails } = ApiConfig;
    const url = baseUrl + getAccDetails;
    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallGet(url, headers);
  },

  addCoinWidthraw: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, setcoinwithdrawal } = ApiConfig;
    const url = baseSecure + setcoinwithdrawal;

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    };

    return ApiCallPut(url, formData, headers);
  },
  CoinCategory: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, CoinCategory } = ApiConfig;
    const url = baseUrl + CoinCategory;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  tradingCommission: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tradingCommission } = ApiConfig;
    const url = baseUrl + tradingCommission;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },


  coinPaymentDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, getcpaccountinfo } = ApiConfig;
    const url = baseWallet + getcpaccountinfo;

    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddCoinPair: async (fShortName, fId, sShortName, sId, sellPrice, buyPrice, available) => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, AddCoinPair } = ApiConfig;
    const url = baseCoin + AddCoinPair;
    const params = {
      base_currency: fShortName,
      quote_currency: sShortName,
      base_currency_id: fId,
      quote_currency_id: sId,
      buy_price: buyPrice,
      sell_price: sellPrice,
      available: available
    };

    ConsoleLogs(TAG + ", AddCoinPair", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  AddPairFee: async (makerFee, takerFee, currencyID) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, AddPairFee } = ApiConfig;

    const url = baseSecure + AddPairFee;

    const params = {
      maker_fee: makerFee,
      taker_fee: takerFee,
      _id: currencyID,
    };

    ConsoleLogs(TAG + ", AddPairFee", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getCurrencyPairList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, getCurrencyPairList } = ApiConfig;

    const url = baseCoin + getCurrencyPairList;
    ConsoleLogs(TAG + ", getCurrencyPairList", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  deleteCurrency: async (_id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, deleteCoinPair } = ApiConfig;
    const url = baseSecure + deleteCoinPair;
    const params = {
      _id: _id,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  botStatus: async (_id, status, gap) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, botStatus } = ApiConfig;
    const url = baseSecure + botStatus;
    const params = {
      _id: _id,
      status: status,
      gap: gap,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTradingReport: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tredingReport } = ApiConfig;
    const url = baseUrl + tredingReport;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  tradeHistory: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tradeHistory } = ApiConfig;

    const url = baseUrl + tradeHistory;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  get_supports: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, get_supports } = ApiConfig;

    const url = baseUrl + get_supports;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  OrderBook: async () => {
    const token = sessionStorage.getItem("token");
    const { baseExchange, OrderBook } = ApiConfig;

    const url = baseExchange + OrderBook;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },
  tradeById: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseExchange, tradeById } = ApiConfig;

    const url = baseExchange + tradeById;
    const params = {
      "order_id": id
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getWithdrawalStatus: async (id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, sendFundStatus } = ApiConfig;

    const url = baseCoin + sendFundStatus;

    const params = {
      _Id: id,
      status: status,
    };

    ConsoleLogs(TAG + ", AddCoinPair", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  completeWithdrawalRequest: async () => {
    const { baseUrl, completeWithdrawalRequest } = ApiConfig;
    const url = baseUrl + completeWithdrawalRequest;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },
  PendingWithdrwal: async () => {
    const { baseUrl, PendingWithdrwal } = ApiConfig;
    const url = baseUrl + PendingWithdrwal;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },
  CancelledWithdrwal: async () => {
    const { baseUrl, CancelledWithdrwal } = ApiConfig;
    const url = baseUrl + CancelledWithdrwal;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  completeDepositRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, completeDepositRequest } = ApiConfig;
    const url = baseUrl + completeDepositRequest;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },
  completePendingRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, completePendingRequest } = ApiConfig;

    const url = baseUrl + completePendingRequest;


    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },
  miscellaneousRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, miscellaneousRequest } = ApiConfig;

    const url = baseUrl + miscellaneousRequest;


    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  getUserWalletList: async (coinName) => {
    const { baseUrl, getUserWalletList } = ApiConfig;
    const url = baseUrl + getUserWalletList;
    const params = {
      coinName: coinName,
    };
    ConsoleLogs(TAG + ", getUserWalletList", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },


  fundsTransfer: async (coinId, userId, amount, type, accType, selectedChain) => {
    const { baseUrl, fundsTransfer } = ApiConfig;

    const url = baseUrl + fundsTransfer;

    const params = {
      userId: userId,
      coinId: coinId,
      type: type,
      amount: amount,
      account_type: accType,
      chain: selectedChain,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },
  MasterAccount: async (userId, makerFee, takerFee, status) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, MasterAccount } = ApiConfig;
    const url = baseUrl + MasterAccount;
    const params = {
      userId: userId,
      maker_fee: makerFee,
      taker_fee: takerFee,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  userWalletTransfer: async (coinId, user_Id, sendWalletTo, amount, otp) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userWalletTransfer } = ApiConfig;
    const url = baseSecure + userWalletTransfer;

    const params = {
      userId: user_Id,
      coinId: coinId,
      to_address: sendWalletTo,
      amount: +amount,
      otp: +otp,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  walletTransfer: async (coinId, user_Id, walletTo, requestOtp, amount) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, walletTransfer } = ApiConfig;
    const url = baseSecure + walletTransfer;

    const params = {
      userId: user_Id,
      coinId: coinId,
      to_address: walletTo,
      amount: +amount,
      otp: +requestOtp,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddrewarRate: async (reward) => {
    const token = sessionStorage.getItem("token");

    const { baseUrl, setrewardrate } = ApiConfig;
    const url = baseUrl + setrewardrate;
    const params = {
      amount: reward,
    };

    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddtdsRate: async (tdsRate) => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, updatetdsrate } = ApiConfig;
    const url = baseSecure + updatetdsrate;
    const params = {
      rate: tdsRate,
    };

    ConsoleLogs(TAG + ", getAccountData", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  updateEmailTamplate: async (emailSubject, key, template) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, updatemailTamplate } = ApiConfig;
    const url = baseSecure + updatemailTamplate;
    const params = {
      emailSubject: emailSubject,
      key: key,
      template: template,
    };
    ConsoleLogs(TAG + ", updatemailTamplate", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getExportList: async () => {
    const { baseUrl, traderreport } = ApiConfig;
    const url = baseUrl + traderreport;
    ConsoleLogs(TAG + ", traderreport", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },
  updateStatus: async (id, status) => {
    const { baseUrl, updateStatus } = ApiConfig;
    const url = baseUrl + updateStatus;
    const params = {
      _id: id,
      status
    }
    ConsoleLogs(TAG + ", traderreport", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPut(url, params, headers);
  },

  getCoinList: async () => {
    const { baseCoin, getCoinList } = ApiConfig;
    const url = baseCoin + getCoinList;

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  exportPandingList: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, pendingtrader } = ApiConfig;
    const url = baseReport + pendingtrader;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    ConsoleLogs(TAG + ", pendingtrader", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportFiatManagement: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, fiatwithreq } = ApiConfig;
    const url = baseReport + fiatwithreq;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportApprovedList: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, verifiedtrader } = ApiConfig;
    const url = baseReport + verifiedtrader;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportFiatDeposit: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, fiatdepreq } = ApiConfig;
    const url = baseReport + fiatdepreq;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  addCoins: async (formData) => {
    const { baseCoin, addNewCoins } = ApiConfig;

    const url = baseCoin + addNewCoins;

    ConsoleLogs(TAG + ", addNewCoins", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return ApiCallPost(url, formData, headers);
  },

  getMasterWalletList: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getMasterWalletList } = ApiConfig;

    const url = baseSecure + getMasterWalletList;

    const params = {
      userId: user_Id,
    };

    ConsoleLogs(TAG + ", getMasterWalletList", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  walletStatus: async (_id, withdrawalstatus) => {
    const { baseSecure, walletStatus } = ApiConfig;

    const url = baseSecure + walletStatus;

    const params = {
      userId: _id,
      status: withdrawalstatus,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },

  getstakingDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { basestaking, stakingList } = ApiConfig;
    const url = basestaking + stakingList;
    const params = {};
    ConsoleLogs(TAG + ", getstakingDetails", `url : ' + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },
  deletePackage: async (_id) => {
    const { baseUrl, deletePackage } = ApiConfig;
    const url = baseUrl + deletePackage;
    const params = {
      _id: _id
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  packageList: async (phase) => {
    const { baseUrl, getPackageList } = ApiConfig;
    const url = baseUrl + getPackageList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  AddPackage: async (currId, coinName, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status) => {
    const { baseUrl, addPackage } = ApiConfig;
    const url = baseUrl + addPackage;
    const params = {
      short_name: coinName,
      currency_id: currId,
      min_amount: minimumAmount,
      max_amount: maximumAmount,
      month_percentage: monthPer,
      remark: remark,
      stacking_start_date: startDate,
      stacking_end_date: endDate,
      breaking_percentages: breakingPer,
      status: status
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  editPackage: async (editCurrency, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status, id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, editPackage } = ApiConfig;
    const url = baseUrl + editPackage;
    const params = {
      short_name: editCurrency,
      _id: id,
      min_amount: minimumAmount,
      max_amount: maximumAmount,
      month_percentage: monthPer,
      remark: remark,
      stacking_start_date: startDate,
      stacking_end_date: endDate,
      breaking_percentages: breakingPer,
      status: status
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  phaseList: async () => {
    const { baseUrl, getPhaseList } = ApiConfig;
    const url = baseUrl + getPhaseList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  allCoinsListing: async () => {
    const { baseUrl, all_coins_listing } = ApiConfig;
    const url = baseUrl + all_coins_listing;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  updatePackageStatus: async (statusPh) => {
    const { uploadcurrency, phaseStatus } = ApiConfig;
    const url = uploadcurrency + phaseStatus;

    const params = {
      phase_name: statusPh,
      status: true
    }

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  updateBannerList: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, updateBanner } = ApiConfig;
    const url = baseUrl + updateBanner;

    ConsoleLogs(TAG + ", updateBanner", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    return ApiCallPost(url, formData, headers);
  },

  deletebannerlist: async (userId) => {
    const token = sessionStorage.getItem("token");

    const { baseUrl, bannerdelete } = ApiConfig;
    const url = baseUrl + bannerdelete;
    const params = {
      _id: userId,
    };
    ConsoleLogs(TAG + ", bannerdelete", `url : + ${url}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleBannerStatus: async (userId, cell) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, BannerStatus } = ApiConfig;
    const url = baseUrl + BannerStatus;
    const params = {
      _id: userId,
      status: cell,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  getUpiOtp: async (signId) => {
    const { baseUrl, getOtp } = ApiConfig;
    const url = baseUrl + getOtp;

    const params = {
      signId: signId,
    };

    ConsoleLogs(TAG + ", getOtp", `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ", getOtp",
      `loginRequestParams : ' + ${JSON.stringify(params)}`
    );

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },

  getAllProject: async (_id) => {
    const { baseFormUrl, getAllProject } = ApiConfig;
    const url = baseFormUrl + getAllProject;

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return ApiCallGet(url, headers);
  },

  brokerList: async (_id) => {
    const { basebroker, brokerList } = ApiConfig;
    const url = basebroker + brokerList;

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },
  single_coin_listing: async (_id) => {
    const token = sessionStorage.getItem('token')
    const { basebroker, single_coin_listing } = ApiConfig;
    const url = basebroker + single_coin_listing + `/${_id}`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    };
    return ApiCallGet(url, headers);
  },
  update_coin_listing_status: async (status, _id) => {
    const token = sessionStorage.getItem('token')
    const { baseUrl, update_coin_listing_status } = ApiConfig;
    const url = baseUrl + update_coin_listing_status + `/${_id}`;
    const params = { status }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    };
    return ApiCallPut(url, params, headers);
  },

  createProject: async (addFormData) => {
    const { baseFormUrl, createProject } = ApiConfig;
    const url = baseFormUrl + createProject;

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return ApiCallPost(url, addFormData, headers);
  },

  createBroker: async (formInput, chain, updatedContractAddress, updatedDecimal) => {
    const { basebroker, createBroker } = ApiConfig;
    const url = basebroker + createBroker;
    const params = {
      email: formInput?.email,
      mobileNumber: formInput?.phone,
      password: formInput?.password,
      firstName: formInput?.brokerName,
      coinName: formInput?.coinName,
      shortName: formInput?.shortName,
      chain: chain,
      contract_address: updatedContractAddress,
      decimals: updatedDecimal
    }

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  deleteProject: async (userID) => {
    const { baseFormUrl, deleteProject } = ApiConfig;
    const url = `${baseFormUrl}${deleteProject}/${userID}`;


    const headers = {
      "Content-Type": "application/json",
    }

    return ApiCallDelete(url, headers);
  },

  updateProject: async (userID, updateFormData) => {
    const { baseFormUrl, updateProject } = ApiConfig;
    const url = `${baseFormUrl}${updateProject}/${userID}`;

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return ApiCallPut(url, updateFormData, headers);
  },

  getCommitData: async (userID) => {
    const { baseFormUrl, getCommitData } = ApiConfig;
    const url = `${baseFormUrl}${getCommitData}/${userID}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallGet(url, headers);
  },
};

export default AuthService;
