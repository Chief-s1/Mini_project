function varargout = braintumor_GUI(varargin)


gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @braintumor_GUI_OpeningFcn, ...
                   'gui_OutputFcn',  @braintumor_GUI_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end



function braintumor_GUI_OpeningFcn(hObject, eventdata, handles, varargin)

handles.output = hObject;


guidata(hObject, handles);


function varargout = braintumor_GUI_OutputFcn(hObject, eventdata, handles) 

varargout{1} = handles.output;



function INPUT_IMAGE_Callback(hObject, eventdata, handles)

global s str
[I,path]=uigetfile('.dcm',"Select The MRI Image");
str=strcat(path,I);
s=dicomread(str);
axes(handles.axes1);
imshow(s);
title('Uploaded Image','FontSize',20);


function DETECT_TUMOR_Callback(hObject, eventdata, handles)

global s tumor sout inp
 num_iter = 10;
    delta_t = 1/7;
    kappa = 15;
    option = 2;
    inp = anisotrophic(s,num_iter,delta_t,kappa,option);
    inp = uint8(inp);
    
inp=imresize(inp,[256,256]);
if size(inp,3)>1
    inp=rgb2gray(inp);
end

sout=imresize(inp,[256,256]);
t0=60;
th=t0+((max(inp(:))+min(inp(:)))./2);
total_px=0;
white_px=0;
for i=1:1:size(inp,1)
    for j=1:1:size(inp,2)
        if inp(i,j)>th
            total_px=total_px+1;
            white_px=white_px+1;
            sout(i,j)=1; %white
        else
            total_px=total_px+1;
            sout(i,j)=0; %black
        end
    end
end


label=bwlabel(sout);
stats=regionprops(logical(sout),'Solidity','Area','BoundingBox'); %returns measurements for the set of properties for each 8-connected component
                                                                  %in the binary image, BW

density=[stats.Solidity];
area=[stats.Area];
high_dense_area=density>0.6;
max_area=max(area(high_dense_area));
tumor_label=find(area==max_area);
tumor=ismember(label,tumor_label);  %The ismember function is useful for creating a binary image containing only objects or regions 
                                   %that meet certain criteria.

if max_area>100
   k = msgbox('Tumor FOUND!!','status');
   axes(handles.axes2);
   imshow(tumor);
   title('Tumor Size','FontSize',20);
else
    h = msgbox('No Tumor is found!!','Results');
    return;
end


% --- Executes on button press in TUMOR_ALONE.
function TUMOR_ALONE_Callback(hObject, eventdata, handles)



global tumor tumorOutline
dilationAmount = 5;
rad = floor(dilationAmount);
[r,c] = size(tumor);
filledImage = imfill(tumor, 'holes');
for i=1:r
   for j=1:c
       x1=i-rad;
       x2=i+rad;
       y1=j-rad;
       y2=j+rad;
       if x1<1
           x1=1;
       end
       if x2>r
           x2=r;
       end
       if y1<1
           y1=1;
       end
       if y2>c
           y2=c;
       end
       erodedImage(i,j) = min(min(filledImage(x1:x2,y1:y2)));
   end
end
tumorOutline=tumor;
tumorOutline(erodedImage)=0;
axes(handles.axes3);
imshow(tumorOutline);
title('Tumor Outline','FontSize',20);

function DETECTED_TUMOR_Callback(hObject, eventdata, handles)

global inp tumorOutline
rgb = inp(:,:,[1 1 1]);
red = rgb(:,:,1);
red(tumorOutline)=0;
green = rgb(:,:,2);
green(tumorOutline)=255;
blue = rgb(:,:,3);
blue(tumorOutline)=0;
tumorOutlineInserted(:,:,1) = red; 
tumorOutlineInserted(:,:,2) = green; 
tumorOutlineInserted(:,:,3) = blue; 
axes(handles.axes4);
imshow(tumorOutlineInserted);
title('Highlighted Tumor','FontSize',20);
