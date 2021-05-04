import {lazy, Suspense} from "react";
import LoadingOverlay from 'fork-victorvhn-react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from "./pages/Welcome/Welcome";
import MyProposals from "./pages/Auth/Dashboard/MyProposals/MyProposals";
import AllAcceptedProposals from "./pages/Auth/Dashboard/AllAcceptedProposal/AllAcceptedProposals";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AdminRoute from "./hoc/AdminRoute";
import NotFound from "./pages/404/404";
import CanShowAllProposals from "./hoc/CanShowAllProposalsRoute";
import CanAcceptProposal from "./hoc/CanAcceptProposalRoute";
import Layout from "./components/Layout/Layout";
import {useSelector} from "react-redux";
import DepartmentAdd from "./pages/Auth/Admin/Departments/DepartmentAdd/DepartmentAdd";
import DepartmentEdit from "./pages/Auth/Admin/Departments/DepartmentEdit/DepartmentEdit";
import UsersEdit from "./pages/Auth/Admin/Users/UsersEdit/UsersEdit";
import UsersShow from "./pages/Auth/Admin/Users/UsersShow/UsersShow";
import UsersAccept from "./pages/Auth/Admin/Users/UsersAccept/UsersAccept";
import DepartmentShow from "./pages/Auth/Admin/Departments/DepartmentShow/DepartmentShow";
import PositionShow from "./pages/Auth/Admin/Positions/PositionShow/PositionShow";
import PositionEdit from "./pages/Auth/Admin/Positions/PositionEdit/PositionEdit";
import PositionAdd from "./pages/Auth/Admin/Positions/PositionAdd/PositionAdd";
import DeviceCategoryEdit from "./pages/Auth/Admin/DeviceCategories/DeviceCategoryEdit/DeviceCategoryEdit";
import DeviceCategoryAdd from "./pages/Auth/Admin/DeviceCategories/DeviceCategoryAdd/DeviceCategoryAdd";
import DeviceCategoryShow from "./pages/Auth/Admin/DeviceCategories/DeviceCategoryShow/DeviceCategoryShow";
import DeviceShow from "./pages/Auth/Admin/Devices/DeviceShow/DeviceShow";
import DeviceAdd from "./pages/Auth/Admin/Devices/DeviceAdd/DeviceAdd";
import DeviceEdit from "./pages/Auth/Admin/Devices/DeviceEdit/DeviceEdit";
import FreeDayAdd from "./pages/Auth/Admin/FreeDays/FreeDayAdd/FreeDayAdd";
import UserPanel from "./pages/Auth/Panel/UserPanel/UserPanel";
import UserDetails from "./pages/Auth/Panel/UserDetails/UserDetails";
import UserDetailsEdit from "./pages/Auth/Panel/UserDetails/UserDetailsEdit/UserDetailsEdit";
import Register from "./pages/Register/Register";
import MyProposalAdd from "./pages/Auth/Dashboard/MyProposals/MyProposalAdd/MyProposalAdd";
import MyProposalEdit from "./pages/Auth/Dashboard/MyProposals/MyProposalEdit/MyProposalEdit";
import MyProposalShow from "./pages/Auth/Dashboard/MyProposals/MyProposalShow/MyProposalShow";

const Admin = lazy(() => import('./pages/Auth/Admin/Admin'));
const ListProposals = lazy(() => import('./pages/Auth/Dashboard/ListProposls/ListProposals'));
const ShowAllProposals = lazy(() => import('./pages/Auth/Dashboard/ShowAllProposals/ShowAllProposals'));

const content = (
    <Suspense fallback={null}>
        <Switch>
            <CanShowAllProposals exact path="/dashboard/proposals/list"  component={ShowAllProposals} />
            <AuthenticatedRoute exact path="/dashboard/proposals/accepted" component={AllAcceptedProposals} />
            <CanAcceptProposal exact path="/dashboard/proposals/accept" component={ListProposals} />

            <AuthenticatedRoute exact path="/dashboard/proposals/add" component={MyProposalAdd} />
            <AuthenticatedRoute exact path="/dashboard/proposals/:id" component={MyProposalShow} />
            <AuthenticatedRoute exact path="/dashboard/proposals/edit/:id" component={MyProposalEdit} />
            <AuthenticatedRoute exact path="/dashboard/proposals" component={MyProposals} />

            <AuthenticatedRoute path="/dashboard/panel/details/edit" component={UserDetailsEdit} />
            <AuthenticatedRoute path="/dashboard/panel/details" component={UserDetails} />
            <AuthenticatedRoute path="/dashboard/panel" component={UserPanel} />

            <AdminRoute path="/admin/users/edit/:id" component={UsersEdit} />
            <AdminRoute path="/admin/users/accept/:id" component={UsersAccept} />
            <AdminRoute path="/admin/users/:id" component={UsersShow} />

            <AdminRoute path="/admin/departments/add" component={DepartmentAdd} />
            <AdminRoute path="/admin/departments/edit/:id" component={DepartmentEdit} />
            <AdminRoute path="/admin/departments/:id" component={DepartmentShow} />


            <AdminRoute path="/admin/positions/add" component={PositionAdd} />
            <AdminRoute path="/admin/positions/edit/:id" component={PositionEdit} />
            <AdminRoute path="/admin/positions/:id" component={PositionShow} />

            <AdminRoute path="/admin/devices/add" component={DeviceAdd} />
            <AdminRoute path="/admin/devices/edit/:id" component={DeviceEdit} />
            <AdminRoute path="/admin/devices/:id" component={DeviceShow} />

            <AdminRoute path="/admin/deviceCategories/add" component={DeviceCategoryAdd} />
            <AdminRoute path="/admin/deviceCategories/edit/:id" component={DeviceCategoryEdit} />
            <AdminRoute path="/admin/deviceCategories/:id" component={DeviceCategoryShow} />

            <AdminRoute path="/admin/freeDays/add" component={FreeDayAdd} />

            <AdminRoute path="/admin" component={Admin} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={Welcome} />
            <Route component={NotFound} />
        </Switch>
    </Suspense>
);

const header = <Header />;

function App() {
    const loading = useSelector(state => state.loading);
    return (
        <LoadingOverlay
            styles={{
                wrapper: {
                    width: '100%',
                    height: '100%'
                }
            }}
            active={loading} spinner={<BounceLoader />}>

            <Router>
                <Layout
                    header={header}
                    content={content}
                />
            </Router>
        </LoadingOverlay>
    );
}

export default App;
