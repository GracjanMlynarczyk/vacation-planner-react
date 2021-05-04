function Layout(props) {
    return (
        <>
            <div>{props.header}</div>
            <div className="container-fluid mt-3">
                {props.content}
            </div>
        </>
    );
}

export default Layout;