import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'orderFilter'})
export class OrderFilterPipe implements PipeTransform{

    transform(value :any, filter:string) {
          filter = filter ? filter.toLocaleLowerCase():null;
          return filter ? value.filter((item:any ) =>
                  item.itemName.toLocaleLowerCase().indexOf(filter) !==-1) :value;
    }
}