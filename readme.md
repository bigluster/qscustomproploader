#Enterprise Architecture team Power Tools
##Custom Property Bulk Loader

#[Download Install](https://github.com/eapowertools/qscustomproploader/blob/master/Install/setup.exe)

###Introduction
The custom property bulk loader enables you to create custom properties and import custom property values from a comma separated value (csv) file.  The goal is to eliminate manual entry of custom property values and enable greater use of custom properties on Qlik Sense resources.  The outcome is fewer security rules required to drive governance and authorization of Qlik Sense resources preventing rule creep and a proliferation of rules in a Qlik Sense deployment.

To learn more about Qlik Sense security rules, __[check out this video introducing Qlik Sense security rules.](https://drive.google.com/open?id=0BxBEVQthCb29ZjVXVEZpQUtOZk0)__

To learn more about building flexible security rules in Qlik Sense __[check out this excellent video by  @Marcus Spitzmiller.](https://community.qlik.com/videos/3762)__

---
###Usage
The custom property bulk loader acts similarly to the custom property screen within Qlik Sense.  The main difference is instead of manually adding values, simply select a file and upload it to the form.

The current supported file type is a csv file.  The content of the csv file is a single column list of values __without a header value__.  Below is a sample table in markdown.

<table>
<tr><td>Sales</td</tr>
<tr><td>Finance</td</tr>
<tr><td>Marketing</td</tr>
<tr><td>Some Directory Group Name</td</tr>
<tr><td>Another Directory Group Name</td</tr>
<tr><td>And Now Something Completely Different</td</tr>
</table>

---
### Installation and Configuration
The custom property bulk loader is intended to work through the Qlik Sense service dispatcher.  An installer for the solution will be supplied shortly that will include all of the runtime files to use the solution. In addition, the installer will include a configuration wizard for easy setup and implementation.

---
### Planned Enhancements
* Existing property name detection
* Add values to existing custom properties
* Inline editing of uploaded property values


---
### Support
<h5 style="color:red;">Enterprise Architecture team Power Tools are not officially supported by Qlik.  Please do not contact Qlik support for help or support on this solution.</h5>
<h5 style="color:green;">The Enterprise Architecture team does provide limited support for the Power Tools deployed publicly.</h5>
<h5 style="color:#4183c4">Please use the issues list to provide feedback and identify bugs we can squash.</h5>
