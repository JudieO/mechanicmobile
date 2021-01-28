// Checks if delivery datetime is before time order was placed

export default function isDateTimeBefore(placeddt, del_datetime){
    if (del_datetime < placeddt){
        del_datetime = placeddt
    }else{

    }
    return del_datetime
}