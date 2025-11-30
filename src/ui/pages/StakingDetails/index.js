import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { CSVLink } from "react-csv";

const StakingDetails = () => {
    const { SearchBar } = Search;
    const [stakingDetails, setStakingDetails] = useState([]);

    const columns = [
        { text: 'UserId', dataField: 'user_id', sort: true },
        { text: 'Currency Name', dataField: 'short_name', sort: true },
        { text: 'Staked Amount', dataField: 'currency_Amount', sort: true },
        { text: 'Staking Days', dataField: 'selected_day', sort: true },
        { text: 'Running Days', dataField: 'running_days', sort: true },
        { text: 'Monthly Reward Percentage', dataField: 'month_percentage', sort: true },
        { text: 'Braking Percenatge', dataField: 'breaking_percentages', sort: true },
        { text: 'Running Reward', dataField: 'running_reward_price', sort: true },
        { text: 'Status', dataField: 'status', sort: true },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });

    useEffect(() => {
        handleStakingDetails()
    }, []);

    const handleStakingDetails = async () => {
        await AuthService.getstakingDetails().then(async result => {
            if (result.success) {
                try {
                    alertSuccessMessage(result.message);
                    setStakingDetails(result.data.reverse());
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }

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
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            Staking List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Main page content */}
                    <div className="container-xl px-4 mt-n10">
                        <div className="card mb-4">
                            <div class="card-header">Staking Details
                                {stakingDetails.length === 0 ? "" :
                                    <div class="dropdown">
                                        <button class="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                                        <div class="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                            <CSVLink data={stakingDetails} class="dropdown-item">Export as CSV</CSVLink>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="card-body mt-3">
                                <table className="" width="100%" >
                                    {stakingDetails.length === 0 ? <h6 className="ifnoData"><img src="/assets/img/no-data.png" alt="" /> <br /> No Data Available</h6> :
                                        <ToolkitProvider
                                            hover
                                            bootstrap4
                                            keyField='id'
                                            columns={columns}
                                            data={stakingDetails}
                                            exportCSV
                                            search >
                                            {
                                                props => (
                                                    <React.Fragment>
                                                        <SearchBar {...props.searchProps} />
                                                        <BootstrapTable
                                                            hover
                                                            bootstrap4
                                                            keyField='id'
                                                            columns={columns}
                                                            data={stakingDetails}
                                                            pagination={pagination}
                                                            filter={filterFactory()}
                                                            {...props.baseProps}
                                                        />
                                                    </React.Fragment>
                                                )
                                            }
                                        </ToolkitProvider>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>

    )
}

export default StakingDetails;