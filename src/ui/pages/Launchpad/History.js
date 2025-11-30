import React, { useEffect, useState } from 'react'
import LoaderHelper from '../../../customComponent/Loading/LoaderHelper'
import AuthService from '../../../api/services/AuthService'
import { alertErrorMessage, alertWarningMessage } from '../../../customComponent/CustomAlertMessage'
import DataTableBase from '../../../customComponent/DataTable'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'

const History = () => {

  const [userData, setUserData] = useState([]);
  const location = useLocation();


  const getUserData = async (id) => {
    try {
      LoaderHelper.loaderStatus(true);
      const result = await AuthService.getCommitData(id)
      LoaderHelper.loaderStatus(false);
      if (result.success) setUserData(result?.data);
    } catch (error) {
      LoaderHelper.loaderStatus(false);
      alertErrorMessage(error.message);
    };
  };

  const columns = [
    { name: <>Commit Date</>, selector: row => moment(row.commitDate).format("DD-MM-YYYYY"), wrap: true, sortable: false },
    { name: <>User Id</>, selector: row => row.userId, wrap: true, sortable: false },
    { name: <>Project Name</>, selector: row => row.projectName, wrap: true, sortable: false },
    { name: <>Project Symbol</>, selector: row => row.projectSymbol, wrap: true, sortable: false },
    { name: <> Commited Quantity</>, selector: row => row.committedQuantity, wrap: true, sortable: false },
    { name: <>Valid Quantity</>, selector: row => row.validQuantity, wrap: true, sortable: false },
    { name: <>Estimated Rewards</>, selector: row => row.estimatedRewards, wrap: true, sortable: false },
    { name: <>Actual Rewards</>, selector: row => row.actualRewards, wrap: true, sortable: false },
  ]

  useEffect(() => {
    if (location.state) {
      getUserData(location.state)
    };
  }, [location.state]);

  return (

    <>
      <div id="layoutSidenav_content">
        <main >
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <Link to="/dashboard/formlist" className="page-header-icon"><i className="fa fa-arrow-left" ></i></Link>
                      <div className="page-header-icon"><i className="far fa-user"></i></div>
                      User Commit History
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between">History


              </div>
              <div className="card-body mt-3">
                {userData.length === 0 ? <h6 className="ifnoData"><img alt="" src="assets/img/no-data.png" /> <br />No Data Available</h6> :
                  <div className="table-responsive" width="100%">
                    <DataTableBase columns={columns} data={userData} />
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  )
}

export default History