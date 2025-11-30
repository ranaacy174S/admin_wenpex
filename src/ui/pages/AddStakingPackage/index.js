import React, { useState, useEffect } from "react";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const AddPackage = () => {
  const [coinName, setCoinName] = useState("")
  const [minimumAmount, setMinimumAmount] = useState()
  const [maximumAmount, setMaximumAmount] = useState()
  const [monthPer, setMonthPer] = useState()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [breakingPer, setBreakingPer] = useState()
  const [remark, setRemark] = useState()
  const [status, setStatus] = useState("true")
  const [coinList, setCoinList] = useState([])
  const [currId, setCurrId] = useState('')

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "coinName":
        setCoinName(event.target.value);
        break;
      case "minimumAmount":
        setMinimumAmount(event.target.value);
        break;
      case "maximumAmount":
        setMaximumAmount(event.target.value)
        break;
      case "monthPercentage":
        setMonthPer(event.target.value);
        break;
      case "startDate":
        setStartDate(event.target.value);
        break;
      case "endDate":
        setEndDate(event.target.value);
        break;
      case "breakingPercentage":
        setBreakingPer(event.target.value);
        break;
      case "remark":
        setRemark(event.target.value);
        break;
      case "status":
        setStatus(event.target.value);
        break;
      default:
    }
  };

  const resetInputChange = () => {
    setCoinName("")
    setMinimumAmount("");
    setMaximumAmount("");
    setMonthPer("")
    setBreakingPer("");
    setRemark("");
    setStartDate("");
    setEndDate("");
    setStatus("true")
  };

  const handleAddPackage = async (currId, coinName, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status) => {
    if (!currId || !coinName || !minimumAmount || !maximumAmount || !monthPer || !startDate || !endDate || !breakingPer || !remark || !status) {
      alertErrorMessage('Please fill all required details')
      return;
    }
    try {
      LoaderHelper.loaderStatus(true);
      const result = await AuthService.AddPackage(currId, coinName, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status)
      LoaderHelper.loaderStatus(false);
      if (result.success) {
        resetInputChange()
        alertSuccessMessage(result.message)
      } else alertErrorMessage(result.message);
    } catch (error) { LoaderHelper.loaderStatus(false); alertErrorMessage(error) }
  };

  const getCoinList = async () => {
    try {
      LoaderHelper.loaderStatus(true);
      const result = await AuthService.getCoinList()
      LoaderHelper.loaderStatus(false);
      if (result.success) setCoinList(result?.data)
      else alertErrorMessage(result.message)
    } catch (error) { LoaderHelper.loaderStatus(false); alertErrorMessage(error.message) }
  };

  useEffect(() => {
    getCoinList()
  }, [])


  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      Add Package
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              <div className="col-12">
                <div class="card mb-4">
                  <div className="card-body d-flex justify-content-center flex-column p-4 ">
                    <div className="d-flex align-items-center justify-content-start mb-3 ">
                      <h5 className="mb-0">Add Package</h5>
                    </div>
                    <div className="row">
                      <div className="form-group  mb-3 col-6">
                        <label class="small mb-1">
                          Name of Currency
                        </label>
                        <select name="coinName" class="form-control form-control-solid form-select form-select-dark" id="exampleFormControlSelect1"
                          onChange={(e) => { const selectedCoinId = e.target.options[e.target.selectedIndex].getAttribute("data-id"); setCoinName(e.target.value); setCurrId(selectedCoinId) }}>
                          <option value="option">Select Coin</option>
                          {coinList.map(coin => <option key={coin?._id} value={coin?.short_name} data-id={coin?._id} >{coin?.short_name}</option>)}
                        </select>
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Minimum Amount ($)
                        </label>
                        <input
                          className="form-control"
                          placeholder="Minimum Amount"
                          type="number"
                          onWheelCapture={e => {
                            e.target.blur()
                          }}
                          name="minimumAmount"
                          value={minimumAmount}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Maximum Amount ($)
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          onWheelCapture={e => {
                            e.target.blur()
                          }}
                          placeholder="Maximum Amount"
                          name="maximumAmount"
                          value={maximumAmount}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Month Percentage (%)
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          onWheelCapture={e => {
                            e.target.blur()
                          }}
                          placeholder="Month Percentage"
                          name="monthPercentage"
                          value={monthPer}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Start Date
                        </label>
                        <input
                          className="form-control"
                          placeholder="Start Date"
                          type="date"
                          value={startDate}
                          name="startDate"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          End Date
                        </label>
                        <input
                          className="form-control"
                          placeholder="End Date"
                          type="date"
                          value={endDate}
                          name="endDate"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Breaking Percentage
                        </label>
                        <input
                          className="form-control"
                          placeholder="Breaking Percentage"
                          type="number"
                          onWheelCapture={e => {
                            e.target.blur()
                          }}
                          value={breakingPer}
                          name="breakingPercentage"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Remark (running upto)
                        </label>
                        <input
                          className="form-control"
                          placeholder="Remark"
                          type="text"
                          value={remark}
                          name="remark"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 col-6">
                        <label class="small mb-1">
                          Status
                        </label>
                        <select class="form-control  form-control-solid" type="text"
                          name="status"
                          onChange={handleInputChange}>
                          <option value="true">TRUE</option>
                          <option value="false">FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <div className="form-group ">
                        <button className="btn btn-indigo w-50" type="button"
                          onClick={() => handleAddPackage(currId, coinName, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status)}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main >
      </div >


    </>
  );
};

export default AddPackage;
