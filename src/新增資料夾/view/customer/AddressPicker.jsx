import React from 'react' 
import Card, {
    CardPrimaryContent,
} from "@material/react-card";

import TextField, { HelperText, Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Select, { Option } from '@material/react-select';


class AddressPicker extends React.Component {
    constructor(props) {
        super(props)
        this.cities = Object.keys(this.props.taiwanPostalCodes)

        this.div = React.createRef()
    }

    componentDidMount = () => {
        let enhanced_selects  = this.div.current.querySelectorAll("input[name='enhanced-select']")
        enhanced_selects.forEach(select => {
            select.removeAttribute("name")
        });
    }

    handlerRelated = (name, value) => {
        let mergeObject = {}
        const { taiwanPostalCodes, fullAddress: { city, district, postalCode, address } } = this.props

        if (name == "city" && city != value) {
            mergeObject['district'] = ""
            mergeObject['postalCode'] = ""
        } else if (name == "district" && district != value) {
            const cityData = taiwanPostalCodes[city];
            const postalCode = cityData[value];
            mergeObject['postalCode'] = postalCode
        }

        return mergeObject
    }

    onEnhancedChange = (name, index, item) => {
        console.log(this)
        const value = item.getAttribute('data-value')
        const { fullAddress, handler } = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    };

    inputHandler = (e) => {
        const { name, value } = e.target
        const { fullAddress, handler } = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    }

    clearAddress = () => {
        const name = "address"
        const value = ""
        const { fullAddress, handler } = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    }

    getCityOptions = (cities) => {
        return cities.map((city) => {
            return (
                <Option key={city} value={city}>{city}</Option>
            )
        })
    }

    getDistricOptions = (districts) => {
        return districts.map((district) => {
            return (
                <Option key={district} value={district}>{district}</Option>
            )
        })
    }

    render = () => {
        const { taiwanPostalCodes, fullAddress: { city, district, postalCode, address } } = this.props
        const cityOptions = this.getCityOptions(this.cities)
        const cityData = taiwanPostalCodes[city];
        const districts = Object.keys(cityData)
        const districtsOptions = this.getDistricOptions(districts)
        return (
            <div ref={this.div}>
                <Card>
                    <CardPrimaryContent>
                        <div style={{ padding: "1rem" }}>
                            <Select
                                label='城市'
                                value={city}
                                onEnhancedChange={this.onEnhancedChange.bind(this, "city")}
                                enhanced
                                outlined
                            >
                                {cityOptions}
                            </Select>
                            <input type="hidden" name="city" value={city} />
                            <br />
                            <br />
                            <Select
                                label='市/區'
                                value={district}
                                onEnhancedChange={this.onEnhancedChange.bind(this, "district")}
                                enhanced
                                outlined
                            >
                                {districtsOptions}
                            </Select>
                            <input type="hidden" name="district" value={district} />
                            <br />
                            <br />
                            <TextField
                                outlined
                                label='郵遞區號'
                            >
                                <Input
                                    type="text"
                                    name="postalCode"
                                    value={postalCode}
                                    disabled={true}
                                />
                            </TextField>
                            <input type="hidden" name="postalCode" value={postalCode} />
                            <br />
                            <br />
                            <TextField
                                outlined
                                label='地址'
                                helperText={<HelperText>請輸入正確地址用以寄送商品</HelperText>}
                                leadingIcon={<MaterialIcon role="button" icon="alarm" />}
                                onTrailingIconSelect={this.clearAddress}
                                trailingIcon={<MaterialIcon role="button" icon="delete" />}
                            >
                                <Input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={this.inputHandler}
                                />
                            </TextField>
                        </div>
                    </CardPrimaryContent>
                </Card>
            </div>
        )
    }
//     state = {value: 'pomsky'};

//   render() {
//     const options = [{
//       label: 'Pomsky',
//       value: 'pomsky',
//     }, {
//       label: 'Golden Doodle',
//       value: 'goldenDoodle',
//       disabled: true,
//     }];

//     return (
//       <Select
//         label='Choose Dog'
//         onChange={(evt) => this.setState({value: evt.target.value})}
//         value={this.state.value}
//         options={options}
//       />
//     );
//   }
}

export default AddressPicker;