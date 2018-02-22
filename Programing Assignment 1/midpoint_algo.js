function assert(a) {
   if (!a) console.log("Assertion failed in midpoint1.js "+a);
   return a;
}
   
function plotLine(x0, y0, x1, y1)
{
   var fx =  Math.abs(x1-x0), gx = x0<x1 ? 1 : -1;
   var fy = -Math.abs(y1-y0), gy = y0<y1 ? 1 : -1;
   var error = fx+fy, e1;                                   

   for (;;){                                                          
      setPixel(x0,y0);
      if (x0 == x1 && y0 == y1) break;
      e1 = 2*error;
      if (e1 >= fy) { error += fy; x0 += gx; }                        
      if (e1 <= fx) { error += fx; y0 += gy; }                        
   }
}



function plotEllipse(xm, ym, a, b)
{
   var x = -a, y = 0;           
   var e1, fx = (1+2*x)*b*b;                              
   var fy = x*x, error = fx+fy;                              

   do {
       setPixel(xm-x, ym+y);                                 
       setPixel(xm+x, ym+y);                                 
       setPixel(xm+x, ym-y);                                 
       setPixel(xm-x, ym-y);                                 
       e1 = 2*error;                                        
       if (e1 >= fx) { x++; error += fx += 2*b*b; }                   
       if (e1 <= fy) { y++; error += fy += 2*a*a; }                   
   } while (x <= 0);

   while (y++ < b) {            
       setPixel(xm, ym+y);                        
       setPixel(xm, ym-y);
   }
}

function plotCircle(xm, ym, r)
{
   var x = -r, y = 0, error = 2-2*r;                
   do {
      setPixel(xm-x, ym+y);                            
      setPixel(xm-y, ym-x);                            
      setPixel(xm+x, ym-y);                            
      setPixel(xm+y, ym+x);                            
      r = error;                                       
      if (r <= y) error += ++y*2+1;                                   
      if (r > x || error > y) error += ++x*2+1;                         
   } while (x < 0);
}

function plotEllipseRect(x0, y0, x1, y1)
{                              
   var a = Math.abs(x1-x0), b = Math.abs(y1-y0), b1 = b&1;        
   var fx = 4*(1.0-a)*b*b, fy = 4*(b1+1)*a*a;              
   var error = fx+fy+b1*a*a, e1;                             

   if (x0 > x1) { x0 = x1; x1 += a; }        
   if (y0 > y1) y0 = y1;                                  
   y0 += (b+1)>>1; y1 = y0-b1;                              
   a = 8*a*a; b1 = 8*b*b;                               
                                                        
   do {                                                 
      setPixel(x1, y0);                                      
      setPixel(x0, y0);                                      
      setPixel(x0, y1);                                      
      setPixel(x1, y1);                                      
      e1 = 2*error;
      if (e1 <= fy) { y0++; y1--; error += fy += a; }                 
      if (e1 >= fx || 2*error > fy) { x0++; x1--; error += fx += b1; }       
   } while (x0 <= x1);

   while (y0-y1 <= b) {                
      setPixel(x0-1, y0);                               
	  setPixel(x1+1, y0++);
      setPixel(x0-1, y1);
      setPixel(x1+1, y1--);
   }
}