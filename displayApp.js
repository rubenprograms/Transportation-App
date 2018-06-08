const FILTER_TYPE = Object.freeze({CHECKBOX: 1, SELECTBOX: 2});

var filters = [{label: "New Only", type: FILTER_TYPE.CHECKBOX}, 
               {label: "Select Type", type: FILTER_TYPE.SELECTBOX, options: ["All", "Cars", "Trucks", "Convertibles"]}
               ];

var cars = [{year: 2013, model: "A", price: 32000},
            {year: 2011, model: "B", price: 4400},
            {year: 2016, model: "B", price: 15500}                        
            ];
         
var trucks = [{year: 2014, model: "D", price: 18000},
               {year: 2013, model: "E", price: 5200}                      
               ];

var convertibles = [{year: 2009, model: "F", price: 2000},
                     {year: 2010, model: "G", price: 6000},
                     {year: 2012, model: "H", price: 12500},
                     {year: 2017, model: "M", price: 50000}                                                
                     ];

ReactDOM.render(
   <div>
      <AppHeader title="Welcome to React Transportation" description="The best place to buy vehicles online"/>
      <FiltersPanel title="Choose Options" filters={filters}/>
      <VehicleSection label="Cars" vehicles={cars}/>
      <VehicleSection label="Trucks" vehicles={trucks}/>
      <VehicleSection label="Convertibles" vehicles={convertibles}/>
   </div>,
   document.getElementById("app")
);

/**
 * Returns a Title element with the string provided in the props argument.
 * @param {Object} props      Object with property 'title', containing the string value used for building
 *                            this Title element.
 */
function Title(props)
{
   return <h3 class="title">{props.title}</h3>
}

/**
 * Returns a Description element with the text provided in the props argument.
 * @param {Object} props      Object with property 'description', containing the string used for building
 *                            this description element.
 */
function Description(props)
{
   return <h3 class="description">{props.desciption}</h3>
}

/**
 * Returns a header consisting of a title and a description, provided in the props argument.
 * @param {Object} props      Object with properties 'title' and 'description', indicating the
 *                            string values used for building this header. 
 */
function AppHeader(props) 
{
   return (
      <div>
         <Title title={props.title}/>
         <Description desciption={props.description}/>
      </div>
   )
}

/**
 * Returns a checkbox with the label provided in argument props.
 * @param {Object} props      Object with property 'label', indicating the string used for this checkbox.
 */
function CheckboxFilter(props)
{
   return (
      <div>
         <label for={props.label}>{props.label}</label>
         <input id={props.label} type="checkbox"/>
      </div>
   )
}

/**
 * Returns a selectbox with the options provied in arguments props.
 * @param {Object} props      Object with properties 'options' - a string array with the options that make up this
 *                            selectbox - and 'label' - the label for the selectbox.
 */
function SelectboxFilter(props)
{
   var options = [];
   for (let o of props.options) 
   {
      options.push(<option value={o}>{o}</option>);
   }
   return (
      <div>
         <label for={props.label}>{props.label}</label>
         <select id={props.label}>
            {options}
         </select>
      </div>
   )
}

/**
 * Returns a panel with the filters and the title specified in the props argument.
 * @param {Object} props      Object with properties 'title' - a string specifying the
 *                            title for this panel - and 'filters' - an array of objects that specifies
 *                            all the filters to be displayed. Each object in array filters has properties
 *                            'label' and 'type' that define how to build the filter. If the filter is of type
 *                            SelectBoxFilter, then the object will have a third property, 'options', which
 *                            is a string array holding the options used for building the selectbox. 
 */
function FiltersPanel(props) 
{
   var filters = [];
   for (let f of props.filters) 
   {
      if (f.type == FILTER_TYPE.CHECKBOX)
      {
         filters.push(<CheckboxFilter label={f.label}/>);
      }
      else if (f.type == FILTER_TYPE.SELECTBOX)
      {
         filters.push(<SelectboxFilter label={f.label} options={f.options}/>);
      }
   }

   return (
      <div>
         <Title title={props.title}/>
         {filters}
      </div>
   )
}

/**
 * Returns a table row representing a vehicle whose data is passed in argument props. The table row has the following
 * cells: Year, Model, Price, and Buy. Cell 'Buy' does not have data but a button that reads 'Buy Now'.
 * @param {Object} props         Object containing the data of the vehicle whose table row is to be built.
 *                               The object has the following properties:
 *                               - year:     Year the vehicle was produced.
 *                               - model:    Model of the vehicle. Values defined in enum VEHICLE_MODEL.
 *                               - price:    Price in dollars.
 */
function VehicleTableRow(props)
{
   return (
      <tr>
         <td>{props.year}</td>
         <td>{props.model}</td>
         <td>{props.price}</td>
         <td>
            <button type="button">Buy Now</button>
         </td>
      </tr>
   )
}


/**
 * Returns a section holding information of vehicles in store. Each section has a title and zero or more
 * tables. The title indicates the type of the vehicles whose tables are shown below. Each table includes
 * the following information about the vehicle: year, model, and price. The last column in the table has a
 * button that reads 'Buy Now'.
 * @param {Object} props         Object containig the data used for building this vehicle section. The
 *                               object has the following properties:
 *                               - label:       Category of the vehicles in this section.
 *                               - vehicles:    Array holding objects representing vehicles whose tables
 *                                              will be displayed. Each object in the array has the following
 *                                              properties:
 *                                              - year:     Year the vehicle was produced.
 *                                              - model:    Model of the vehicle. Values defined in enum VEHICLE_MODEL.
 *                                              - price:    Price in dollars.
 */
function VehicleSection(props) 
{
   var rows = [];
   for (let v of props.vehicles) 
   {
      rows.push(<VehicleTableRow year={v.year} model={v.model} price={v.price}/>);
   }

   return (
      <div>
         <Title title={props.label}/>
         <table>
            <tr>
               <th>Year</th>
               <th>Model</th>
               <th>Price</th>
               <th>Buy</th>
            </tr>
            {rows}
         </table>
      </div>
   )
}