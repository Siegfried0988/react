import AddressPicker from './AddressPicker.jsx'
import ReceiptType from './ReceiptType.jsx'
// import Test from './Test.jsx'
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'bootstrap';
import TaiwanPostalCode from './TaiwanPostalCode.json'
import Button from '@material/react-button';
import {Cell, Grid, Row} from '@material/react-layout-grid';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            receipt: {
                receiptType: 2,
                taxId: "",
                receiptOptions: ["byMail"]
            },
            fullAddress: {
                city: "新竹市",
                district: "",
                postalCode: "",
                address: ""
            }
        }
    }

    handler = (name, value) => {
        this.setState({ [name]: value }, () => {
            console.log(this.state)
        })
    }

    checkIsReceiptTypeReady = () => {
        let result = false
        if (this.state.receipt.receiptType == 2) {
            result = true
        } else if (this.state.receipt.receiptType == 3 && this.state.receipt.taxId != "") {
            result = true
        }

        return result
    }

    checkIsAddressReady = () => {
        const { city, district, postalCode, address } = this.state.fullAddress
        if (city != "" && district != "" && postalCode != "" && address != "") {
            return true
        }
        return false
    }

    isReady = () => {
        return this.checkIsReceiptTypeReady() && this.checkIsAddressReady()
    }

    render = () => {
        return (
            
            <div>
                {/* <Button>sssss</Button> */}
            
            <form>
                <Grid>
                    <Row>
                        <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                        <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                            <ReceiptType
                                handler={this.handler}
                                receipt={this.state.receipt}
                            />

                            <br />
                        </Cell>
                        <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    </Row>
                    <Row>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                        <AddressPicker
                            handler={this.handler}
                            fullAddress={this.state.fullAddress}
                            taiwanPostalCodes={TaiwanPostalCode}
                        />
                        
                        
                        <br />
                    </Cell>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    </Row>
                    <Row>
                        <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                        <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                            <Button type="submit" outlined disabled={!this.isReady()}>
                                Submit
                            </Button>
                            
                        </Cell>
                        <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    </Row>
                </Grid>
                
            </form>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));