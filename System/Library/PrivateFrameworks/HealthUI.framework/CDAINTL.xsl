<?xml version="1.0" encoding="UTF-8"?>
<!--
  Title: CDA XSL StyleSheet
  Original Filename: cda.xsl 
  Version: 3.0
  Revision History: 08/12/08 Jingdong Li updated
  Revision History: 12/11/09 KH updated 
  Revision History:  03/30/10 Jingdong Li updated.
  Revision History:  08/25/10 Jingdong Li updated
  Revision History:  09/17/10 Jingdong Li updated
  Revision History:  01/05/11 Jingdong Li updated
  Revision History:  04/06/14 Rick Geimer security hot fixes: Addressed javascript in nonXMLBody/text/reference/@value and non-sanitized copy of all table attributes.
  Revision History:  04/07/14 Rick Geimer more security fixes. Limited copy of only legal CDA table attributes to XHTML output.
  Revision History:  04/07/14 Rick Geimer more security fixes. Fixed some bugs from the hot fix on 4/6 ($uc and $lc swapped during some translates). Added limit-external-images param that defaults to yes. When set to yes, no URIs with colons (protocol URLs) or beginning with double slashes (protocol relative URLs) are allowed in observation media. I'll revise later to add a whitelist capability.
  Revision History:  04/13/14 Rick Geimer more security fixes. Added sandbox attribute to iframe. Added td to the list of elements with restricted table attributes (missed that one previously). Fixed some typos. Cleaned up CSS styles. Merged the table templates since they all use the same code. Fixed a bug with styleCode processing that could result in lost data. Added external-image-whitelist param.
  Specification: ANSI/HL7 CDAR2
  The current version and documentation are available at http://www.lantanagroup.com/resources/tools/. 
  We welcome feedback and contributions to tools@lantanagroup.com
  The stylesheet is the cumulative work of several developers; the most significant prior milestones were the foundation work from HL7 
  Germany and Finland (Tyylitiedosto) and HL7 US (Calvin Beebe), and the presentation approach from Tony Schaller, medshare GmbH provided at IHIC 2009. 
-->
<!-- LICENSE INFORMATION
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
  You may obtain a copy of the License at  http://www.apache.org/licenses/LICENSE-2.0 
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:n1="urn:hl7-org:v3"
                xmlns:in="urn:lantana-com:inline-variable-data">
    <xsl:output method="html" indent="yes" version="4.01" encoding="ISO-8859-1" doctype-system="http://www.w3.org/TR/html4/strict.dtd" doctype-public="-//W3C//DTD HTML 4.01//EN"/>
    <xsl:param name="limit-external-images" select="'yes'"/>
    <!-- A vertical bar separated list of URI prefixes, such as "http://www.example.com|https://www.example.com" -->
    <xsl:param name="external-image-whitelist"/>
    <!-- string processing variables -->
    <xsl:variable name="lc" select="'abcdefghijklmnopqrstuvwxyz'" />
    <xsl:variable name="uc" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
    <!-- removes the following characters, in addition to line breaks "':;?`{}“”„‚’ -->
    <xsl:variable name="simple-sanitizer-match"><xsl:text>&#10;&#13;&#34;&#39;&#58;&#59;&#63;&#96;&#123;&#125;&#8220;&#8221;&#8222;&#8218;&#8217;</xsl:text></xsl:variable>
    <xsl:variable name="simple-sanitizer-replace" select="'***************'"/>
    <xsl:variable name="javascript-injection-warning">WARNING: Javascript injection attempt detected in source CDA document. Terminating</xsl:variable>
    <xsl:variable name="malicious-content-warning">WARNING: Potentially malicious content found in CDA document.</xsl:variable>

    <!-- global variable title -->
    <xsl:variable name="title">
        <xsl:choose>
            <xsl:when test="string-length(/n1:ClinicalDocument/n1:title)  &gt;= 1">
                <xsl:value-of select="/n1:ClinicalDocument/n1:title"/>
            </xsl:when>
            <xsl:when test="/n1:ClinicalDocument/n1:code/@displayName">
                <xsl:value-of select="/n1:ClinicalDocument/n1:code/@displayName"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>@@CLINICAL_DOCUMENT@@</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <!-- Main -->
    <xsl:template match="/">
        <xsl:apply-templates select="n1:ClinicalDocument"/>
    </xsl:template>
    <!-- produce browser rendered, human readable clinical document -->
    <xsl:template match="n1:ClinicalDocument">
        <html>
            <head>
                <xsl:comment> Do NOT edit this HTML directly: it was generated via an XSLT transformation from a CDA Release 2 XML document. </xsl:comment>
                <title>
                    <xsl:value-of select="$title"/>
                </title>
                <xsl:call-template name="addCSS"/>
            </head>
            <body>
                <h1 class="h1center">
                    <xsl:value-of select="$title"/>
                </h1>
                <!-- produce table of contents -->
                <xsl:if test="not(//n1:nonXMLBody)">
                    <xsl:if test="count(/n1:ClinicalDocument/n1:component/n1:structuredBody/n1:component[n1:section]) &gt; 1">
                        <xsl:call-template name="make-tableofcontents"/>
                    </xsl:if>
                </xsl:if>
                <!-- START display top portion of clinical document -->
                <h2>Summary</h2>
                <xsl:call-template name="recordTarget"/>
                <xsl:call-template name="documentGeneral"/>
                <xsl:call-template name="documentationOf"/>
                <xsl:call-template name="author"/>
                <xsl:call-template name="componentOf"/>
                <xsl:call-template name="participant"/>
                <xsl:call-template name="dataEnterer"/>
                <xsl:call-template name="authenticator"/>
                <xsl:call-template name="informant"/>
                <xsl:call-template name="informationRecipient"/>
                <xsl:call-template name="legalAuthenticator"/>
                <xsl:call-template name="custodian"/>
                <!-- END display top portion of clinical document -->
                <!-- produce human readable document content -->
                <xsl:apply-templates select="n1:component/n1:structuredBody|n1:component/n1:nonXMLBody"/>
                <br/>
                <br/>
            </body>
        </html>
    </xsl:template>
    <!-- generate table of contents -->
    <xsl:template name="make-tableofcontents">
        <h2>
            <a name="toc"><xsl:text>@@TABLE_OF_CONTENTS@@</xsl:text></a>
        </h2>
        <ul>
            <xsl:for-each select="n1:component/n1:structuredBody/n1:component/n1:section/n1:title">
                <li>
                    <a href="#{generate-id(.)}">
                        <xsl:value-of select="."/>
                    </a>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <!-- header elements -->
    <xsl:template name="documentGeneral">
        <table class="header_table">
            <tbody>
                <tr>
                    <td class="td_header_role_name">
                        <span class="td_label">
                            <xsl:text>@@DOCUMENT_ID@@</xsl:text>
                        </span>
                    </td>
                    <td class="td_header_role_value">
                        <xsl:call-template name="show-id">
                            <xsl:with-param name="id" select="n1:id"/>
                        </xsl:call-template>
                    </td>
                </tr>
                <tr>
                    <td class="td_header_role_name">
                        <span class="td_label">
                            <xsl:text>@@DOCUMENT_CREATED_@@</xsl:text>
                        </span>
                    </td>
                    <td class="td_header_role_value">
                        <xsl:call-template name="show-time">
                            <xsl:with-param name="datetime" select="n1:effectiveTime"/>
                        </xsl:call-template>
                    </td>
                </tr>
            </tbody>
        </table>
    </xsl:template>
    <!-- confidentiality -->
    <xsl:template name="confidentiality">
        <table class="header_table">
            <tbody>
                <td class="td_header_role_name">
                    <xsl:text>@@CONFIDENTIALITY@@</xsl:text>
                </td>
                <td class="td_header_role_value">
                    <xsl:choose>
                        <xsl:when test="n1:confidentialityCode/@code  = &apos;N&apos;">
                            <xsl:text>@@NORMAL@@</xsl:text>
                        </xsl:when>
                        <xsl:when test="n1:confidentialityCode/@code  = &apos;R&apos;">
                            <xsl:text>@@RESTRICTED@@</xsl:text>
                        </xsl:when>
                        <xsl:when test="n1:confidentialityCode/@code  = &apos;V&apos;">
                            <xsl:text>@@VERY_RESTRICTED@@</xsl:text>
                        </xsl:when>
                    </xsl:choose>
                    <xsl:if test="n1:confidentialityCode/n1:originalText">
                        <xsl:text>@@SPACE@@</xsl:text>
                        <xsl:value-of select="n1:confidentialityCode/n1:originalText"/>
                    </xsl:if>
                </td>
            </tbody>
        </table>
    </xsl:template>
    <!-- author -->
    <xsl:template name="author">
        <xsl:if test="n1:author">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:author/n1:assignedAuthor">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@AUTHOR@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:choose>
                                    <xsl:when test="n1:assignedPerson/n1:name">
                                        <xsl:call-template name="show-name">
                                            <xsl:with-param name="name" select="n1:assignedPerson/n1:name"/>
                                        </xsl:call-template>
                                        <xsl:if test="n1:representedOrganization">
                                            <xsl:text>@@COMMA_NUMSPACE@@</xsl:text>
                                            <xsl:call-template name="show-name">
                                                <xsl:with-param name="name" select="n1:representedOrganization/n1:name"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </xsl:when>
                                    <xsl:when test="n1:assignedAuthoringDevice/n1:softwareName">
                                        <xsl:value-of select="n1:assignedAuthoringDevice/n1:softwareName"/>
                                    </xsl:when>
                                    <xsl:when test="n1:representedOrganization">
                                        <xsl:call-template name="show-name">
                                            <xsl:with-param name="name" select="n1:representedOrganization/n1:name"/>
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:for-each select="n1:id">
                                            <xsl:call-template name="show-id">
                                                <xsl:with-param name="id" select="."/>
                                            </xsl:call-template>
                                            <br/>
                                        </xsl:for-each>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                        <xsl:if test="n1:addr | n1:telecom">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label"><xsl:text>@@CONTACT_INFO@@</xsl:text></span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-contactInfo">
                                        <xsl:with-param name="contact" select="."/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!--  authenticator -->
    <xsl:template name="authenticator">
        <xsl:if test="n1:authenticator">
            <table class="header_table">
                <tbody>
                    <tr>
                        <xsl:for-each select="n1:authenticator">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label">
                                        <xsl:text>@@SIGNED_@@</xsl:text>
                                    </span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-name">
                                        <xsl:with-param name="name" select="n1:assignedEntity/n1:assignedPerson/n1:name"/>
                                    </xsl:call-template>
                                    <xsl:text>@@_AT_@@</xsl:text>
                                    <xsl:call-template name="show-time">
                                        <xsl:with-param name="datetime" select="n1:time"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                            <xsl:if test="n1:assignedEntity/n1:addr | n1:assignedEntity/n1:telecom">
                                <tr>
                                    <td class="td_header_role_name">
                                        <span class="td_label"><xsl:text>@@CONTACT_INFO_1@@</xsl:text></span>
                                    </td>
                                    <td class="td_header_role_value">
                                        <xsl:call-template name="show-contactInfo">
                                            <xsl:with-param name="contact" select="n1:assignedEntity"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                        </xsl:for-each>
                    </tr>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- legalAuthenticator -->
    <xsl:template name="legalAuthenticator">
        <xsl:if test="n1:legalAuthenticator">
            <table class="header_table">
                <tbody>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@LEGAL_AUTHENTICATOR@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:call-template name="show-assignedEntity">
                                <xsl:with-param name="asgnEntity" select="n1:legalAuthenticator/n1:assignedEntity"/>
                            </xsl:call-template>
                            <xsl:text>@@SPACE_1@@</xsl:text>
                            <xsl:call-template name="show-sig">
                                <xsl:with-param name="sig" select="n1:legalAuthenticator/n1:signatureCode"/>
                            </xsl:call-template>
                            <xsl:if test="n1:legalAuthenticator/n1:time/@value">
                                <xsl:text>@@_AT__1@@</xsl:text>
                                <xsl:call-template name="show-time">
                                    <xsl:with-param name="datetime" select="n1:legalAuthenticator/n1:time"/>
                                </xsl:call-template>
                            </xsl:if>
                        </td>
                    </tr>
                    <xsl:if test="n1:legalAuthenticator/n1:assignedEntity/n1:addr | n1:legalAuthenticator/n1:assignedEntity/n1:telecom">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label"><xsl:text>@@CONTACT_INFO_2@@</xsl:text></span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:call-template name="show-contactInfo">
                                    <xsl:with-param name="contact" select="n1:legalAuthenticator/n1:assignedEntity"/>
                                </xsl:call-template>
                            </td>
                        </tr>
                    </xsl:if>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- dataEnterer -->
    <xsl:template name="dataEnterer">
        <xsl:if test="n1:dataEnterer">
            <table class="header_table">
                <tbody>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@ENTERED_BY@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:call-template name="show-assignedEntity">
                                <xsl:with-param name="asgnEntity" select="n1:dataEnterer/n1:assignedEntity"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <xsl:if test="n1:dataEnterer/n1:assignedEntity/n1:addr | n1:dataEnterer/n1:assignedEntity/n1:telecom">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label"><xsl:text>@@CONTACT_INFO_3@@</xsl:text></span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:call-template name="show-contactInfo">
                                    <xsl:with-param name="contact" select="n1:dataEnterer/n1:assignedEntity"/>
                                </xsl:call-template>
                            </td>
                        </tr>
                    </xsl:if>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- componentOf -->
    <xsl:template name="componentOf">
        <xsl:if test="n1:componentOf">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:componentOf/n1:encompassingEncounter">
                        <xsl:if test="n1:id">
                            <xsl:choose>
                                <xsl:when test="n1:code">
                                    <tr>
                                        <td class="td_header_role_name">
                                            <span class="td_label">
                                                <xsl:text>@@ENCOUNTER_ID@@</xsl:text>
                                            </span>
                                        </td>
                                        <td class="td_header_role_value">
                                            <xsl:call-template name="show-id">
                                                <xsl:with-param name="id" select="n1:id"/>
                                            </xsl:call-template>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_header_role_name">
                                            <span class="td_label">
                                                <xsl:text>@@ENCOUNTER_TYPE@@</xsl:text>
                                            </span>
                                        </td>
                                        <td class="td_header_role_value">
                                            <xsl:call-template name="show-code">
                                                <xsl:with-param name="code" select="n1:code"/>
                                            </xsl:call-template>
                                        </td>
                                    </tr>
                                </xsl:when>
                                <xsl:otherwise>
                                    <tr>
                                        <td class="td_header_role_name">
                                            <span class="td_label">
                                                <xsl:text>@@ENCOUNTER_ID_1@@</xsl:text>
                                            </span>
                                        </td>
                                        <td class="td_header_role_value">
                                            <xsl:call-template name="show-id">
                                                <xsl:with-param name="id" select="n1:id"/>
                                            </xsl:call-template>
                                        </td>
                                    </tr>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:if>
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@ENCOUNTER_DATE@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:if test="n1:effectiveTime">
                                    <xsl:choose>
                                        <xsl:when test="n1:effectiveTime/@value">
                                            <xsl:text>@@_AT__2@@</xsl:text>
                                            <xsl:call-template name="show-time">
                                                <xsl:with-param name="datetime" select="n1:effectiveTime"/>
                                            </xsl:call-template>
                                        </xsl:when>
                                        <xsl:when test="n1:effectiveTime/n1:low">
                                            <xsl:text>@@_FROM_@@</xsl:text>
                                            <xsl:call-template name="show-time">
                                                <xsl:with-param name="datetime" select="n1:effectiveTime/n1:low"/>
                                            </xsl:call-template>
                                            <xsl:if test="n1:effectiveTime/n1:high">
                                                <xsl:text>@@_TO_@@</xsl:text>
                                                <xsl:call-template name="show-time">
                                                    <xsl:with-param name="datetime" select="n1:effectiveTime/n1:high"/>
                                                </xsl:call-template>
                                            </xsl:if>
                                        </xsl:when>
                                    </xsl:choose>
                                </xsl:if>
                            </td>
                        </tr>
                        <xsl:if test="n1:location/n1:healthCareFacility">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label">
                                        <xsl:text>@@ENCOUNTER_LOCATION@@</xsl:text>
                                    </span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:choose>
                                        <xsl:when test="n1:location/n1:healthCareFacility/n1:location/n1:name">
                                            <xsl:call-template name="show-name">
                                                <xsl:with-param name="name" select="n1:location/n1:healthCareFacility/n1:location/n1:name"/>
                                            </xsl:call-template>
                                            <xsl:for-each select="n1:location/n1:healthCareFacility/n1:serviceProviderOrganization/n1:name">
                                                <xsl:text>@@_OF_@@</xsl:text>
                                                <xsl:call-template name="show-name">
                                                    <xsl:with-param name="name" select="n1:location/n1:healthCareFacility/n1:serviceProviderOrganization/n1:name"/>
                                                </xsl:call-template>
                                            </xsl:for-each>
                                        </xsl:when>
                                        <xsl:when test="n1:location/n1:healthCareFacility/n1:code">
                                            <xsl:call-template name="show-code">
                                                <xsl:with-param name="code" select="n1:location/n1:healthCareFacility/n1:code"/>
                                            </xsl:call-template>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:if test="n1:location/n1:healthCareFacility/n1:id">
                                                <xsl:text>@@ID__@@</xsl:text>
                                                <xsl:for-each select="n1:location/n1:healthCareFacility/n1:id">
                                                    <xsl:call-template name="show-id">
                                                        <xsl:with-param name="id" select="."/>
                                                    </xsl:call-template>
                                                </xsl:for-each>
                                            </xsl:if>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:if>
                        <xsl:if test="n1:responsibleParty">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label">
                                        <xsl:text>@@RESPONSIBLE_PARTY@@</xsl:text>
                                    </span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-assignedEntity">
                                        <xsl:with-param name="asgnEntity" select="n1:responsibleParty/n1:assignedEntity"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:if>
                        <xsl:if test="n1:responsibleParty/n1:assignedEntity/n1:addr | n1:responsibleParty/n1:assignedEntity/n1:telecom">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label"><xsl:text>@@CONTACT_INFO_4@@</xsl:text></span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-contactInfo">
                                        <xsl:with-param name="contact" select="n1:responsibleParty/n1:assignedEntity"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- custodian -->
    <xsl:template name="custodian">
        <xsl:if test="n1:custodian">
            <table class="header_table">
                <tbody>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@DOCUMENT_MAINTAINED_BY@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:choose>
                                <xsl:when test="n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name">
                                    <xsl:call-template name="show-name">
                                        <xsl:with-param name="name" select="n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name"/>
                                    </xsl:call-template>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:for-each select="n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:id">
                                        <xsl:call-template name="show-id"/>
                                        <xsl:if test="position()!=last()">
                                            <br/>
                                        </xsl:if>
                                    </xsl:for-each>
                                </xsl:otherwise>
                            </xsl:choose>
                        </td>
                    </tr>
                    <xsl:if test="n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:addr |             n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:telecom">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label"><xsl:text>@@CONTACT_INFO_5@@</xsl:text></span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:call-template name="show-contactInfo">
                                    <xsl:with-param name="contact" select="n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization"/>
                                </xsl:call-template>
                            </td>
                        </tr>
                    </xsl:if>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- documentationOf -->
    <xsl:template name="documentationOf">
        <xsl:if test="n1:documentationOf">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:documentationOf">
                        <xsl:if test="n1:serviceEvent/@classCode and n1:serviceEvent/n1:code">
                            <xsl:variable name="displayName">
                                <xsl:call-template name="show-actClassCode">
                                    <xsl:with-param name="clsCode" select="n1:serviceEvent/@classCode"/>
                                </xsl:call-template>
                            </xsl:variable>
                            <xsl:if test="$displayName">
                                <tr>
                                    <td class="td_header_role_name">
                                        <span class="td_label">
                                            <xsl:call-template name="firstCharCaseUp">
                                                <xsl:with-param name="data" select="$displayName"/>
                                            </xsl:call-template>
                                        </span>
                                    </td>
                                    <td class="td_header_role_value">
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="n1:serviceEvent/n1:code"/>
                                        </xsl:call-template>
                                        <xsl:if test="n1:serviceEvent/n1:effectiveTime">
                                            <xsl:choose>
                                                <xsl:when test="n1:serviceEvent/n1:effectiveTime/@value">
                                                    <xsl:text>@@_AT__3@@</xsl:text>
                                                    <xsl:call-template name="show-time">
                                                        <xsl:with-param name="datetime" select="n1:serviceEvent/n1:effectiveTime"/>
                                                    </xsl:call-template>
                                                </xsl:when>
                                                <xsl:when test="n1:serviceEvent/n1:effectiveTime/n1:low">
                                                    <xsl:text>@@_FROM__1@@</xsl:text>
                                                    <xsl:call-template name="show-time">
                                                        <xsl:with-param name="datetime" select="n1:serviceEvent/n1:effectiveTime/n1:low"/>
                                                    </xsl:call-template>
                                                    <xsl:if test="n1:serviceEvent/n1:effectiveTime/n1:high">
                                                        <xsl:text>@@_TO__1@@</xsl:text>
                                                        <xsl:call-template name="show-time">
                                                            <xsl:with-param name="datetime" select="n1:serviceEvent/n1:effectiveTime/n1:high"/>
                                                        </xsl:call-template>
                                                    </xsl:if>
                                                </xsl:when>
                                            </xsl:choose>
                                        </xsl:if>
                                    </td>
                                </tr>
                            </xsl:if>
                        </xsl:if>
                        <xsl:for-each select="n1:serviceEvent/n1:performer">
                            <xsl:variable name="displayName">
                                <xsl:call-template name="show-participationType">
                                    <xsl:with-param name="ptype" select="@typeCode"/>
                                </xsl:call-template>
                                <xsl:text>@@SPACE_2@@</xsl:text>
                                <xsl:if test="n1:functionCode/@code">
                                    <xsl:call-template name="show-participationFunction">
                                        <xsl:with-param name="pFunction" select="n1:functionCode/@code"/>
                                    </xsl:call-template>
                                </xsl:if>
                            </xsl:variable>
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label">
                                        <xsl:call-template name="firstCharCaseUp">
                                            <xsl:with-param name="data" select="$displayName"/>
                                        </xsl:call-template>
                                    </span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-assignedEntity">
                                        <xsl:with-param name="asgnEntity" select="n1:assignedEntity"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- inFulfillmentOf -->
    <xsl:template name="inFulfillmentOf">
        <xsl:if test="n1:infulfillmentOf">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:inFulfillmentOf">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@IN_FULFILLMENT_OF@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:for-each select="n1:order">
                                    <xsl:for-each select="n1:id">
                                        <xsl:call-template name="show-id"/>
                                    </xsl:for-each>
                                    <xsl:for-each select="n1:code">
                                        <xsl:text>@@NUMERIC_SPACE@@</xsl:text>
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="."/>
                                        </xsl:call-template>
                                    </xsl:for-each>
                                    <xsl:for-each select="n1:priorityCode">
                                        <xsl:text>@@NUMERIC_SPACE_1@@</xsl:text>
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="."/>
                                        </xsl:call-template>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- informant -->
    <xsl:template name="informant">
        <xsl:if test="n1:informant">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:informant">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@INFORMANT@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:if test="n1:assignedEntity">
                                    <xsl:call-template name="show-assignedEntity">
                                        <xsl:with-param name="asgnEntity" select="n1:assignedEntity"/>
                                    </xsl:call-template>
                                </xsl:if>
                                <xsl:if test="n1:relatedEntity">
                                    <xsl:call-template name="show-relatedEntity">
                                        <xsl:with-param name="relatedEntity" select="n1:relatedEntity"/>
                                    </xsl:call-template>
                                </xsl:if>
                            </td>
                        </tr>
                        <xsl:choose>
                            <xsl:when test="n1:assignedEntity/n1:addr | n1:assignedEntity/n1:telecom">
                                <tr>
                                    <td class="td_header_role_name">
                                        <span class="td_label"><xsl:text>@@CONTACT_INFO_6@@</xsl:text></span>
                                    </td>
                                    <td class="td_header_role_value">
                                        <xsl:if test="n1:assignedEntity">
                                            <xsl:call-template name="show-contactInfo">
                                                <xsl:with-param name="contact" select="n1:assignedEntity"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </td>
                                </tr>
                            </xsl:when>
                            <xsl:when test="n1:relatedEntity/n1:addr | n1:relatedEntity/n1:telecom">
                                <tr>
                                    <td class="td_header_role_name">
                                        <span class="td_label"><xsl:text>@@CONTACT_INFO_7@@</xsl:text></span>
                                    </td>
                                    <td class="td_header_role_value">
                                        <xsl:if test="n1:relatedEntity">
                                            <xsl:call-template name="show-contactInfo">
                                                <xsl:with-param name="contact" select="n1:relatedEntity"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </td>
                                </tr>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- informantionRecipient -->
    <xsl:template name="informationRecipient">
        <xsl:if test="n1:informationRecipient">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:informationRecipient">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@INFORMATION_RECIPIENT_@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:choose>
                                    <xsl:when test="n1:intendedRecipient/n1:informationRecipient/n1:name">
                                        <xsl:for-each select="n1:intendedRecipient/n1:informationRecipient">
                                            <xsl:call-template name="show-name">
                                                <xsl:with-param name="name" select="n1:name"/>
                                            </xsl:call-template>
                                            <xsl:if test="position() != last()">
                                                <br/>
                                            </xsl:if>
                                        </xsl:for-each>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:for-each select="n1:intendedRecipient">
                                            <xsl:for-each select="n1:id">
                                                <xsl:call-template name="show-id"/>
                                            </xsl:for-each>
                                            <xsl:if test="position() != last()">
                                                <br/>
                                            </xsl:if>
                                            <br/>
                                        </xsl:for-each>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                        <xsl:if test="n1:intendedRecipient/n1:addr | n1:intendedRecipient/n1:telecom">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label"><xsl:text>@@CONTACT_INFO_8@@</xsl:text></span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-contactInfo">
                                        <xsl:with-param name="contact" select="n1:intendedRecipient"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- participant -->
    <xsl:template name="participant">
        <xsl:if test="n1:participant">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:participant">
                        <tr>
                            <td class="td_header_role_name">
                                <xsl:variable name="participtRole">
                                    <xsl:call-template name="translateRoleAssoCode">
                                        <xsl:with-param name="classCode" select="n1:associatedEntity/@classCode"/>
                                        <xsl:with-param name="code" select="n1:associatedEntity/n1:code"/>
                                    </xsl:call-template>
                                </xsl:variable>
                                <xsl:choose>
                                    <xsl:when test="$participtRole">
                                        <span class="td_label">
                                            <xsl:call-template name="firstCharCaseUp">
                                                <xsl:with-param name="data" select="$participtRole"/>
                                            </xsl:call-template>
                                        </span>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <span class="td_label">
                                            <xsl:text>@@PARTICIPANT@@</xsl:text>
                                        </span>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:if test="n1:functionCode">
                                    <xsl:call-template name="show-code">
                                        <xsl:with-param name="code" select="n1:functionCode"/>
                                    </xsl:call-template>
                                </xsl:if>
                                <xsl:call-template name="show-associatedEntity">
                                    <xsl:with-param name="assoEntity" select="n1:associatedEntity"/>
                                </xsl:call-template>
                                <xsl:if test="n1:time">
                                    <xsl:if test="n1:time/n1:low">
                                        <xsl:text>@@_FROM__2@@</xsl:text>
                                        <xsl:call-template name="show-time">
                                            <xsl:with-param name="datetime" select="n1:time/n1:low"/>
                                        </xsl:call-template>
                                    </xsl:if>
                                    <xsl:if test="n1:time/n1:high">
                                        <xsl:text>@@_TO__2@@</xsl:text>
                                        <xsl:call-template name="show-time">
                                            <xsl:with-param name="datetime" select="n1:time/n1:high"/>
                                        </xsl:call-template>
                                    </xsl:if>
                                </xsl:if>
                                <xsl:if test="position() != last()">
                                    <br/>
                                </xsl:if>
                            </td>
                        </tr>
                        <xsl:if test="n1:associatedEntity/n1:addr | n1:associatedEntity/n1:telecom">
                            <tr>
                                <td class="td_header_role_name">
                                    <span class="td_label">
                                        <xsl:text>@@CONTACT_INFO_9@@</xsl:text>
                                    </span>
                                </td>
                                <td class="td_header_role_value">
                                    <xsl:call-template name="show-contactInfo">
                                        <xsl:with-param name="contact" select="n1:associatedEntity"/>
                                    </xsl:call-template>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- recordTarget -->
    <xsl:template name="recordTarget">
        <table class="header_table">
            <xsl:for-each select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole">
                <xsl:if test="not(n1:id/@nullFlavor)">
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@PATIENT@@</xsl:text>
                            </span>
                        </td>
                        <td  class="td_header_role_value">
                            <xsl:call-template name="show-name">
                                <xsl:with-param name="name" select="n1:patient/n1:name"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@DATE_OF_BIRTH@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:call-template name="show-time">
                                <xsl:with-param name="datetime" select="n1:patient/n1:birthTime"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@SEX@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:for-each select="n1:patient/n1:administrativeGenderCode">
                                <xsl:call-template name="show-gender"/>
                            </xsl:for-each>
                        </td>
                    </tr>
                    <xsl:if test="n1:patient/n1:raceCode | (n1:patient/n1:ethnicGroupCode)">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@RACE@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:choose>
                                    <xsl:when test="n1:patient/n1:raceCode">
                                        <xsl:for-each select="n1:patient/n1:raceCode">
                                            <xsl:call-template name="show-race-ethnicity"/>
                                        </xsl:for-each>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:text>@@INFORMATION_NOT_AVAILABLE@@</xsl:text>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                        <tr>
                            <td  class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@ETHNICITY@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:choose>
                                    <xsl:when test="n1:patient/n1:ethnicGroupCode">
                                        <xsl:for-each select="n1:patient/n1:ethnicGroupCode">
                                            <xsl:call-template name="show-race-ethnicity"/>
                                        </xsl:for-each>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:text>@@INFORMATION_NOT_AVAILABLE_1@@</xsl:text>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                    </xsl:if>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label">
                                <xsl:text>@@CONTACT_INFO_10@@</xsl:text>
                            </span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:call-template name="show-contactInfo">
                                <xsl:with-param name="contact" select="."/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_header_role_name">
                            <span class="td_label"><xsl:text>@@PATIENT_IDS@@</xsl:text></span>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:for-each select="n1:id">
                                <xsl:call-template name="show-id"/>
                                <br/>
                            </xsl:for-each>
                        </td>
                    </tr>
                </xsl:if>
            </xsl:for-each>
        </table>
    </xsl:template>
    <!-- relatedDocument -->
    <xsl:template name="relatedDocument">
        <xsl:if test="n1:relatedDocument">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:relatedDocument">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@RELATED_DOCUMENT@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:for-each select="n1:parentDocument">
                                    <xsl:for-each select="n1:id">
                                        <xsl:call-template name="show-id"/>
                                        <br/>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- authorization (consent) -->
    <xsl:template name="authorization">
        <xsl:if test="n1:authorization">
            <table class="header_table">
                <tbody>
                    <xsl:for-each select="n1:authorization">
                        <tr>
                            <td class="td_header_role_name">
                                <span class="td_label">
                                    <xsl:text>@@CONSENT@@</xsl:text>
                                </span>
                            </td>
                            <td class="td_header_role_value">
                                <xsl:choose>
                                    <xsl:when test="n1:consent/n1:code">
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="n1:consent/n1:code"/>
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="n1:consent/n1:statusCode"/>
                                        </xsl:call-template>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <br/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- setAndVersion -->
    <xsl:template name="setAndVersion">
        <xsl:if test="n1:setId and n1:versionNumber">
            <table class="header_table">
                <tbody>
                    <tr>
                        <td class="td_header_role_name">
                            <xsl:text>@@SETID_AND_VERSION@@</xsl:text>
                        </td>
                        <td class="td_header_role_value">
                            <xsl:text>@@SETID__@@</xsl:text>
                            <xsl:call-template name="show-id">
                                <xsl:with-param name="id" select="n1:setId"/>
                            </xsl:call-template>
                            <xsl:text>@@__VERSION__@@</xsl:text>
                            <xsl:value-of select="n1:versionNumber/@value"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </xsl:if>
    </xsl:template>
    <!-- show StructuredBody  -->
    <xsl:template match="n1:component/n1:structuredBody">
        <xsl:for-each select="n1:component/n1:section">
            <xsl:call-template name="section"/>
        </xsl:for-each>
    </xsl:template>
    <!-- show nonXMLBody -->
    <xsl:template match='n1:component/n1:nonXMLBody'>
        <xsl:choose>
            <!-- if there is a reference, use that in an IFRAME -->
            <xsl:when test='n1:text/n1:reference'>
                <xsl:variable name="source" select="string(n1:text/n1:reference/@value)"/>
                <xsl:variable name="lcSource" select="translate($source, $uc, $lc)"/>
                <xsl:variable name="scrubbedSource" select="translate($source, $simple-sanitizer-match, $simple-sanitizer-replace)"/>
                <xsl:message><xsl:value-of select="$source"/>, <xsl:value-of select="$lcSource"/></xsl:message>
                <xsl:choose>
                    <xsl:when test="contains($lcSource,'javascript')">
                        <p><xsl:value-of select="$javascript-injection-warning"/> </p>
                        <xsl:message><xsl:value-of select="$javascript-injection-warning"/></xsl:message>
                    </xsl:when>
                    <xsl:when test="not($source = $scrubbedSource)">
                        <p><xsl:value-of select="$malicious-content-warning"/> </p>
                        <xsl:message><xsl:value-of select="$malicious-content-warning"/></xsl:message>
                    </xsl:when>
                    <xsl:otherwise>
                        <iframe name='nonXMLBody' id='nonXMLBody' WIDTH='80%' HEIGHT='600' src='{$source}' sandbox=""/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:when test='n1:text/@mediaType="text/plain"'>
                <pre><xsl:value-of select='n1:text/text()'/></pre>
            </xsl:when>
            <xsl:otherwise>
                <pre>Cannot display the text</pre>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- top level component/section: display title and text,
      and process any nested component/sections
    -->
    <xsl:template name="section">
        <xsl:call-template name="section-title">
            <xsl:with-param name="title" select="n1:title"/>
        </xsl:call-template>
        <xsl:call-template name="section-author"/>
        <xsl:call-template name="section-text"/>
        <xsl:for-each select="n1:component/n1:section">
            <xsl:call-template name="nestedSection">
                <xsl:with-param name="margin" select="2"/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>
    <!-- top level section title -->
    <xsl:template name="section-title">
        <xsl:param name="title"/>
        <xsl:choose>
            <xsl:when test="count(/n1:ClinicalDocument/n1:component/n1:structuredBody/n1:component[n1:section]) &gt; 1">
                <h3>
                    <a name="{generate-id($title)}" href="#toc">
                        <xsl:value-of select="$title"/>
                    </a>
                </h3>
            </xsl:when>
            <xsl:otherwise>
                <h3>
                    <xsl:value-of select="$title"/>
                </h3>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- section author -->
    <xsl:template name="section-author">
        <xsl:if test="count(n1:author)&gt;0">
            <div style="margin-left : 2em;">
                <b>
                    <xsl:text>@@SECTION_AUTHOR__@@</xsl:text>
                </b>
                <xsl:for-each select="n1:author/n1:assignedAuthor">
                    <xsl:choose>
                        <xsl:when test="n1:assignedPerson/n1:name">
                            <xsl:call-template name="show-name">
                                <xsl:with-param name="name" select="n1:assignedPerson/n1:name"/>
                            </xsl:call-template>
                            <xsl:if test="n1:representedOrganization">
                                <xsl:text>@@COMMA_NUMSPACE_1@@</xsl:text>
                                <xsl:call-template name="show-name">
                                    <xsl:with-param name="name" select="n1:representedOrganization/n1:name"/>
                                </xsl:call-template>
                            </xsl:if>
                        </xsl:when>
                        <xsl:when test="n1:assignedAuthoringDevice/n1:softwareName">
                            <xsl:value-of select="n1:assignedAuthoringDevice/n1:softwareName"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:for-each select="n1:id">
                                <xsl:call-template name="show-id"/>
                                <br/>
                            </xsl:for-each>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
                <br/>
            </div>
        </xsl:if>
    </xsl:template>
    <!-- top-level section Text   -->
    <xsl:template name="section-text">
        <div>
            <xsl:apply-templates select="n1:text"/>
        </div>
    </xsl:template>
    <!-- nested component/section -->
    <xsl:template name="nestedSection">
        <xsl:param name="margin"/>
        <h4 style="margin-left : {$margin}em;">
            <xsl:value-of select="n1:title"/>
        </h4>
        <div style="margin-left : {$margin}em;">
            <xsl:apply-templates select="n1:text"/>
        </div>
        <xsl:for-each select="n1:component/n1:section">
            <xsl:call-template name="nestedSection">
                <xsl:with-param name="margin" select="2*$margin"/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>
    <!--   paragraph  -->
    <xsl:template match="n1:paragraph">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <!--   pre format  -->
    <xsl:template match="n1:pre">
        <pre>
            <xsl:apply-templates/>
        </pre>
    </xsl:template>
    <!--   Content w/ deleted text is hidden -->
    <xsl:template match="n1:content[@revised='delete']"/>
    <!--   content  -->
    <xsl:template match="n1:content">
        <span>
            <xsl:apply-templates select="@styleCode"/>
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <!-- line break -->
    <xsl:template match="n1:br">
        <xsl:element name='br'>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <!--   list  -->
    <xsl:template match="n1:list">
        <xsl:if test="n1:caption">
            <p>
                <b>
                    <xsl:apply-templates select="n1:caption"/>
                </b>
            </p>
        </xsl:if>
        <ul>
            <xsl:for-each select="n1:item">
                <li>
                    <xsl:apply-templates/>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template match="n1:list[@listType='ordered']">
        <xsl:if test="n1:caption">
            <span style="font-weight:bold; ">
                <xsl:apply-templates select="n1:caption"/>
            </span>
        </xsl:if>
        <ol>
            <xsl:for-each select="n1:item">
                <li>
                    <xsl:apply-templates/>
                </li>
            </xsl:for-each>
        </ol>
    </xsl:template>
    <!--   caption  -->
    <xsl:template match="n1:caption">
        <xsl:apply-templates/>
        <xsl:text>@@COLON_SPACE@@</xsl:text>
    </xsl:template>
    <!--  Tables   -->
    <!--
    <xsl:template match="n1:table/@*|n1:thead/@*|n1:tfoot/@*|n1:tbody/@*|n1:colgroup/@*|n1:col/@*|n1:tr/@*|n1:th/@*|n1:td/@*">

        <xsl:copy>
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>
    -->
    <xsl:variable name="table-elem-attrs">
        <in:tableElems>
            <in:elem name="table">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="summary"/>
                <in:attr name="width"/>
                <in:attr name="border"/>
                <in:attr name="frame"/>
                <in:attr name="rules"/>
                <in:attr name="cellspacing"/>
                <in:attr name="cellpadding"/>
            </in:elem>
            <in:elem name="thead">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="tfoot">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="tbody">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="colgroup">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="span"/>
                <in:attr name="width"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="col">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="span"/>
                <in:attr name="width"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="tr">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="th">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="abbr"/>
                <in:attr name="axis"/>
                <in:attr name="headers"/>
                <in:attr name="scope"/>
                <in:attr name="rowspan"/>
                <in:attr name="colspan"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
            <in:elem name="td">
                <in:attr name="ID"/>
                <in:attr name="language"/>
                <in:attr name="styleCode"/>
                <in:attr name="abbr"/>
                <in:attr name="axis"/>
                <in:attr name="headers"/>
                <in:attr name="scope"/>
                <in:attr name="rowspan"/>
                <in:attr name="colspan"/>
                <in:attr name="align"/>
                <in:attr name="char"/>
                <in:attr name="charoff"/>
                <in:attr name="valign"/>
            </in:elem>
        </in:tableElems>
    </xsl:variable>

    <xsl:template name="output-attrs">
        <xsl:variable name="elem-name" select="local-name(.)"/>
        <xsl:for-each select="@*">
            <xsl:variable name="attr-name" select="local-name(.)"/>
            <xsl:variable name="source" select="."/>
            <xsl:variable name="lcSource" select="translate($source, $uc, $lc)"/>
            <xsl:variable name="scrubbedSource" select="translate($source, $simple-sanitizer-match, $simple-sanitizer-replace)"/>
            <xsl:choose>
                <xsl:when test="contains($lcSource,'javascript')">
                    <p><xsl:value-of select="$javascript-injection-warning"/></p>
                    <xsl:message terminate="yes"><xsl:value-of select="$javascript-injection-warning"/></xsl:message>
                </xsl:when>
                <xsl:when test="$attr-name='styleCode'">
                    <xsl:apply-templates select="."/>
                </xsl:when>
                <xsl:when test="not(document('')/xsl:stylesheet/xsl:variable[@name='table-elem-attrs']/in:tableElems/in:elem[@name=$elem-name]/in:attr[@name=$attr-name])">
                    <xsl:message><xsl:value-of select="$attr-name"/> is not legal in <xsl:value-of select="$elem-name"/></xsl:message>
                </xsl:when>
                <xsl:when test="not($source = $scrubbedSource)">
                    <p><xsl:value-of select="$malicious-content-warning"/> </p>
                    <xsl:message><xsl:value-of select="$malicious-content-warning"/></xsl:message>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:copy-of select="."/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="n1:table | n1:thead | n1:tfoot | n1:tbody | n1:colgroup | n1:col | n1:tr | n1:th | n1:td">
        <xsl:element name="{local-name()}">
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <!--
    <xsl:template match="n1:table">
        <table>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </table>
    </xsl:template>
    <xsl:template match="n1:thead">
        <thead>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </thead>
    </xsl:template>
    <xsl:template match="n1:tfoot">
        <tfoot>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </tfoot>
    </xsl:template>
    <xsl:template match="n1:tbody">
        <tbody>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </tbody>
    </xsl:template>
    <xsl:template match="n1:colgroup">
        <colgroup>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </colgroup>
    </xsl:template>
    <xsl:template match="n1:col">
        <col>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </col>
    </xsl:template>
    <xsl:template match="n1:tr">
        <tr>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>
    <xsl:template match="n1:th">
        <th>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </th>
    </xsl:template>
    <xsl:template match="n1:td">
        <td>
            <xsl:call-template name="output-attrs"/>
            <xsl:apply-templates/>
        </td>
    </xsl:template>
-->


    <xsl:template match="n1:table/n1:caption">
        <span style="font-weight:bold; ">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <!--   RenderMultiMedia
     this currently only handles GIF's and JPEG's.  It could, however,
     be extended by including other image MIME types in the predicate
     and/or by generating <object> or <applet> tag with the correct
     params depending on the media type  @ID  =$imageRef  referencedObject
     -->


    <xsl:template name="check-external-image-whitelist">
        <xsl:param name="current-whitelist"/>
        <xsl:param name="image-uri"/>
        <xsl:choose>
            <xsl:when test="string-length($current-whitelist) &gt; 0">
                <xsl:variable name="whitelist-item">
                    <xsl:choose>
                        <xsl:when test="contains($current-whitelist,'|')">
                            <xsl:value-of select="substring-before($current-whitelist,'|')"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$current-whitelist"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <xsl:choose>
                    <xsl:when test="starts-with($image-uri,$whitelist-item)">
                        <br clear="all"/>
                        <xsl:element name="img">
                            <xsl:attribute name="src"><xsl:value-of select="$image-uri"/></xsl:attribute>
                        </xsl:element>
                        <xsl:message><xsl:value-of select="$image-uri"/> is in the whitelist</xsl:message>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="check-external-image-whitelist">
                            <xsl:with-param name="current-whitelist" select="substring-after($current-whitelist,'|')"/>
                            <xsl:with-param name="image-uri" select="$image-uri"/>
                        </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>

            </xsl:when>
            <xsl:otherwise>
                <p>WARNING: non-local image found <xsl:value-of select="$image-uri"/>. Removing. If you wish non-local images preserved please set the limit-external-images param to 'no'.</p>
                <xsl:message>WARNING: non-local image found <xsl:value-of select="$image-uri"/>. Removing. If you wish non-local images preserved please set the limit-external-images param to 'no'.</xsl:message>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <xsl:template match="n1:renderMultiMedia">
        <xsl:variable name="imageRef" select="@referencedObject"/>
        <xsl:choose>
            <xsl:when test="//n1:regionOfInterest[@ID=$imageRef]">
                <!-- Here is where the Region of Interest image referencing goes -->
                <xsl:if test="//n1:regionOfInterest[@ID=$imageRef]//n1:observationMedia/n1:value[@mediaType='image/gif' or
 @mediaType='image/jpeg']">
                    <xsl:variable name="image-uri" select="//n1:regionOfInterest[@ID=$imageRef]//n1:observationMedia/n1:value/n1:reference/@value"/>

                    <xsl:choose>
                        <xsl:when test="$limit-external-images='yes' and (contains($image-uri,':') or starts-with($image-uri,'\\'))">
                            <xsl:call-template name="check-external-image-whitelist">
                                <xsl:with-param name="current-whitelist" select="$external-image-whitelist"/>
                                <xsl:with-param name="image-uri" select="$image-uri"/>
                            </xsl:call-template>
                            <!--
                            <p>WARNING: non-local image found <xsl:value-of select="$image-uri"/>. Removing. If you wish non-local images preserved please set the limit-external-images param to 'no'.</p>
                            <xsl:message>WARNING: non-local image found <xsl:value-of select="$image-uri"/>. Removing. If you wish non-local images preserved please set the limit-external-images param to 'no'.</xsl:message>
                            -->
                        </xsl:when>
                        <!--
                        <xsl:when test="$limit-external-images='yes' and starts-with($image-uri,'\\')">
                            <p>WARNING: non-local image found <xsl:value-of select="$image-uri"/></p>
                            <xsl:message>WARNING: non-local image found <xsl:value-of select="$image-uri"/>. Removing. If you wish non-local images preserved please set the limit-external-images param to 'no'.</xsl:message>
                        </xsl:when>
                        -->
                        <xsl:otherwise>
                            <br clear="all"/>
                            <xsl:element name="img">
                                <xsl:attribute name="src"><xsl:value-of select="$image-uri"/></xsl:attribute>
                            </xsl:element>
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <!-- Here is where the direct MultiMedia image referencing goes -->
                <xsl:if test="//n1:observationMedia[@ID=$imageRef]/n1:value[@mediaType='image/gif' or @mediaType='image/jpeg']">
                    <br clear="all"/>
                    <xsl:element name="img">
                        <xsl:attribute name="src"><xsl:value-of select="//n1:observationMedia[@ID=$imageRef]/n1:value/n1:reference/@value"/></xsl:attribute>
                    </xsl:element>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--    Stylecode processing
     Supports Bold, Underline and Italics display
     -->
    <xsl:template match="@styleCode">
        <xsl:attribute name="class"><xsl:value-of select="."/></xsl:attribute>
    </xsl:template>
    <!--
    <xsl:template match="//n1:*[@styleCode]">
        <xsl:if test="@styleCode='Bold'">
            <xsl:element name="b">
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:if>
        <xsl:if test="@styleCode='Italics'">
            <xsl:element name="i">
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:if>
        <xsl:if test="@styleCode='Underline'">
            <xsl:element name="u">
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:if>
        <xsl:if test="contains(@styleCode,'Bold') and contains(@styleCode,'Italics') and not (contains(@styleCode, 'Underline'))">
            <xsl:element name="b">
                <xsl:element name="i">
                    <xsl:apply-templates/>
                </xsl:element>
            </xsl:element>
        </xsl:if>
        <xsl:if test="contains(@styleCode,'Bold') and contains(@styleCode,'Underline') and not (contains(@styleCode, 'Italics'))">
            <xsl:element name="b">
                <xsl:element name="u">
                    <xsl:apply-templates/>
                </xsl:element>
            </xsl:element>
        </xsl:if>
        <xsl:if test="contains(@styleCode,'Italics') and contains(@styleCode,'Underline') and not (contains(@styleCode, 'Bold'))">
            <xsl:element name="i">
                <xsl:element name="u">
                    <xsl:apply-templates/>
                </xsl:element>
            </xsl:element>
        </xsl:if>
        <xsl:if test="contains(@styleCode,'Italics') and contains(@styleCode,'Underline') and contains(@styleCode, 'Bold')">
            <xsl:element name="b">
                <xsl:element name="i">
                    <xsl:element name="u">
                        <xsl:apply-templates/>
                    </xsl:element>
                </xsl:element>
            </xsl:element>
        </xsl:if>
        <xsl:if test="not (contains(@styleCode,'Italics') or contains(@styleCode,'Underline') or contains(@styleCode, 'Bold'))">
            <xsl:apply-templates/>
        </xsl:if>
    </xsl:template>
    -->
    <!--    Superscript or Subscript   -->
    <xsl:template match="n1:sup">
        <xsl:element name="sup">
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="n1:sub">
        <xsl:element name="sub">
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <!-- show-signature -->
    <xsl:template name="show-sig">
        <xsl:param name="sig"/>
        <xsl:choose>
            <xsl:when test="$sig/@code =&apos;S&apos;">
                <xsl:text>@@SIGNED@@</xsl:text>
            </xsl:when>
            <xsl:when test="$sig/@code=&apos;I&apos;">
                <xsl:text>@@INTENDED@@</xsl:text>
            </xsl:when>
            <xsl:when test="$sig/@code=&apos;X&apos;">
                <xsl:text>@@SIGNATURE_REQUIRED@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!--  show-id -->
    <xsl:template name="show-id">
        <xsl:param name="id" select="."/>
        <xsl:choose>
            <xsl:when test="not($id)">
                <xsl:if test="not(@nullFlavor)">
                    <xsl:if test="@extension">
                        <xsl:value-of select="@extension"/>
                    </xsl:if>
                    <xsl:text>@@SPACE_3@@</xsl:text>
                    <xsl:value-of select="@root"/>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="not($id/@nullFlavor)">
                    <xsl:if test="$id/@extension">
                        <xsl:value-of select="$id/@extension"/>
                    </xsl:if>
                    <xsl:text>@@SPACE_4@@</xsl:text>
                    <xsl:value-of select="$id/@root"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- show-name  -->
    <xsl:template name="show-name">
        <xsl:param name="name"/>
        <xsl:choose>
            <xsl:when test="$name/n1:family">
                <xsl:if test="$name/n1:prefix">
                    <xsl:value-of select="$name/n1:prefix"/>
                    <xsl:text>@@SPACE_5@@</xsl:text>
                </xsl:if>
                <xsl:value-of select="$name/n1:given"/>
                <xsl:text>@@SPACE_6@@</xsl:text>
                <xsl:value-of select="$name/n1:family"/>
                <xsl:if test="$name/n1:suffix">
                    <xsl:text>@@COMMA_NUMSPACE_2@@</xsl:text>
                    <xsl:value-of select="$name/n1:suffix"/>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$name"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- show-gender  -->
    <xsl:template name="show-gender">
        <xsl:choose>
            <xsl:when test="@code   = &apos;M&apos;">
                <xsl:text>@@MALE@@</xsl:text>
            </xsl:when>
            <xsl:when test="@code  = &apos;F&apos;">
                <xsl:text>@@FEMALE@@</xsl:text>
            </xsl:when>
            <xsl:when test="@code  = &apos;U&apos;">
                <xsl:text>@@UNDIFFERENTIATED@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!-- show-race-ethnicity  -->
    <xsl:template name="show-race-ethnicity">
        <xsl:choose>
            <xsl:when test="@displayName">
                <xsl:value-of select="@displayName"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="@code"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- show-contactInfo -->
    <xsl:template name="show-contactInfo">
        <xsl:param name="contact"/>
        <xsl:call-template name="show-address">
            <xsl:with-param name="address" select="$contact/n1:addr"/>
        </xsl:call-template>
        <xsl:call-template name="show-telecom">
            <xsl:with-param name="telecom" select="$contact/n1:telecom"/>
        </xsl:call-template>
    </xsl:template>
    <!-- show-address -->
    <xsl:template name="show-address">
        <xsl:param name="address"/>
        <xsl:choose>
            <xsl:when test="$address">
                <xsl:if test="$address/@use">
                    <xsl:text>@@SPACE_7@@</xsl:text>
                    <xsl:call-template name="translateTelecomCode">
                        <xsl:with-param name="code" select="$address/@use"/>
                    </xsl:call-template>
                    <xsl:text>@@COLON@@</xsl:text>
                    <br/>
                </xsl:if>
                <xsl:for-each select="$address/n1:streetAddressLine">
                    <xsl:value-of select="."/>
                    <br/>
                </xsl:for-each>
                <xsl:if test="$address/n1:streetName">
                    <xsl:value-of select="$address/n1:streetName"/>
                    <xsl:text>@@SPACE_8@@</xsl:text>
                    <xsl:value-of select="$address/n1:houseNumber"/>
                    <br/>
                </xsl:if>
                <xsl:if test="string-length($address/n1:city)>0">
                    <xsl:value-of select="$address/n1:city"/>
                </xsl:if>
                <xsl:if test="string-length($address/n1:state)>0">
                    <xsl:text>@@COMMA_SPACE@@</xsl:text>
                    <xsl:value-of select="$address/n1:state"/>
                </xsl:if>
                <xsl:if test="string-length($address/n1:postalCode)>0">
                    <xsl:text>@@NUMERIC_SPACE_2@@</xsl:text>
                    <xsl:value-of select="$address/n1:postalCode"/>
                </xsl:if>
                <xsl:if test="string-length($address/n1:country)>0">
                    <xsl:text>@@COMMA_SPACE_1@@</xsl:text>
                    <xsl:value-of select="$address/n1:country"/>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>@@ADDRESS_NOT_AVAILABLE@@</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
        <br/>
    </xsl:template>
    <!-- show-telecom -->
    <xsl:template name="show-telecom">
        <xsl:param name="telecom"/>
        <xsl:choose>
            <xsl:when test="$telecom">
                <xsl:variable name="type" select="substring-before($telecom/@value, ':')"/>
                <xsl:variable name="value" select="substring-after($telecom/@value, ':')"/>
                <xsl:if test="$type">
                    <xsl:call-template name="translateTelecomCode">
                        <xsl:with-param name="code" select="$type"/>
                    </xsl:call-template>
                    <xsl:if test="@use">
                        <xsl:text>@@SPACE_OPEN@@</xsl:text>
                        <xsl:call-template name="translateTelecomCode">
                            <xsl:with-param name="code" select="@use"/>
                        </xsl:call-template>
                        <xsl:text>@@CLOSE_PAREN@@</xsl:text>
                    </xsl:if>
                    <xsl:text>@@COLON_SPACE_1@@</xsl:text>
                    <xsl:text>@@SPACE_9@@</xsl:text>
                    <xsl:value-of select="$value"/>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>@@TELECOM_INFORMATION_NOT_AVAILABLE@@</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
        <br/>
    </xsl:template>
    <!-- show-recipientType -->
    <xsl:template name="show-recipientType">
        <xsl:param name="typeCode"/>
        <xsl:choose>
            <xsl:when test="$typeCode='PRCP'">Primary Recipient:</xsl:when>
            <xsl:when test="$typeCode='TRC'">Secondary Recipient:</xsl:when>
            <xsl:otherwise>Recipient:</xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- Convert Telecom URL to display text -->
    <xsl:template name="translateTelecomCode">
        <xsl:param name="code"/>
        <!--xsl:value-of select="document('voc.xml')/systems/system[@root=$code/@codeSystem]/code[@value=$code/@code]/@displayName"/-->
        <!--xsl:value-of select="document('codes.xml')/*/code[@code=$code]/@display"/-->
        <xsl:choose>
            <!-- lookup table Telecom URI -->
            <xsl:when test="$code='tel'">
                <xsl:text>@@TEL@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='fax'">
                <xsl:text>@@FAX@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='http'">
                <xsl:text>@@WEB@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='mailto'">
                <xsl:text>@@MAIL@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='H'">
                <xsl:text>@@HOME@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='HV'">
                <xsl:text>@@VACATION_HOME@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='HP'">
                <xsl:text>@@PRIMARY_HOME@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='WP'">
                <xsl:text>@@WORK_PLACE@@</xsl:text>
            </xsl:when>
            <xsl:when test="$code='PUB'">
                <xsl:text>@@PUB@@</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$code"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- convert RoleClassAssociative code to display text -->
    <xsl:template name="translateRoleAssoCode">
        <xsl:param name="classCode"/>
        <xsl:param name="code"/>
        <xsl:choose>
            <xsl:when test="$classCode='AFFL'">
                <xsl:text>@@AFFILIATE@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='AGNT'">
                <xsl:text>@@AGENT@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='ASSIGNED'">
                <xsl:text>@@ASSIGNED_ENTITY@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='COMPAR'">
                <xsl:text>@@COMMISSIONING_PARTY@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='CON'">
                <xsl:text>@@CONTACT@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='ECON'">
                <xsl:text>@@EMERGENCY_CONTACT@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='NOK'">
                <xsl:text>@@NEXT_OF_KIN@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='SGNOFF'">
                <xsl:text>@@SIGNING_AUTHORITY@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='GUARD'">
                <xsl:text>@@GUARDIAN@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='GUAR'">
                <xsl:text>@@GUARDIAN_1@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='CIT'">
                <xsl:text>@@CITIZEN@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='COVPTY'">
                <xsl:text>@@COVERED_PARTY@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='PRS'">
                <xsl:text>@@PERSONAL_RELATIONSHIP@@</xsl:text>
            </xsl:when>
            <xsl:when test="$classCode='CAREGIVER'">
                <xsl:text>@@CARE_GIVER@@</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$classCode"/>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:if test="($code/@code) and ($code/@codeSystem='2.16.840.1.113883.5.111')">
            <xsl:text>@@SPACE_10@@</xsl:text>
            <xsl:choose>
                <xsl:when test="$code/@code='FTH'">
                    <xsl:text>@@_FATHER_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='MTH'">
                    <xsl:text>@@_MOTHER_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='NPRN'">
                    <xsl:text>@@_NATURAL_PARENT_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='STPPRN'">
                    <xsl:text>@@_STEP_PARENT_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='SONC'">
                    <xsl:text>@@_SON_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='DAUC'">
                    <xsl:text>@@_DAUGHTER_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='CHILD'">
                    <xsl:text>@@_CHILD_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='EXT'">
                    <xsl:text>@@_EXTENDED_FAMILY_MEMBER_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='NBOR'">
                    <xsl:text>@@_NEIGHBOR_@@</xsl:text>
                </xsl:when>
                <xsl:when test="$code/@code='SIGOTHR'">
                    <xsl:text>@@_SIGNIFICANT_OTHER_@@</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$code/@code"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    <!-- show time -->
    <xsl:template name="show-time">
        <xsl:param name="datetime"/>
        <xsl:choose>
            <xsl:when test="not($datetime)">
                <xsl:call-template name="formatDateTime">
                    <xsl:with-param name="date" select="@value"/>
                </xsl:call-template>
                <xsl:text>@@SPACE_11@@</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="formatDateTime">
                    <xsl:with-param name="date" select="$datetime/@value"/>
                </xsl:call-template>
                <xsl:text>@@SPACE_12@@</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- paticipant facility and date -->
    <xsl:template name="facilityAndDates">
        <table class="header_table">
            <tbody>
                <!-- facility id -->
                <tr>
                    <td class="td_header_role_name">
                        <span class="td_label">
                            <xsl:text>@@FACILITY_ID@@</xsl:text>
                        </span>
                    </td>
                    <td class="td_header_role_value">
                        <xsl:choose>
                            <xsl:when test="count(/n1:ClinicalDocument/n1:participant
                                      [@typeCode='LOC'][@contextControlCode='OP']
                                      /n1:associatedEntity[@classCode='SDLOC']/n1:id)&gt;0">
                                <!-- change context node -->
                                <xsl:for-each select="/n1:ClinicalDocument/n1:participant
                                      [@typeCode='LOC'][@contextControlCode='OP']
                                      /n1:associatedEntity[@classCode='SDLOC']/n1:id">
                                    <xsl:call-template name="show-id"/>
                                    <!-- change context node again, for the code -->
                                    <xsl:for-each select="../n1:code">
                                        <xsl:text>@@SPACE_OPEN_1@@</xsl:text>
                                        <xsl:call-template name="show-code">
                                            <xsl:with-param name="code" select="."/>
                                        </xsl:call-template>
                                        <xsl:text>@@CLOSE_PAREN_1@@</xsl:text>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </xsl:when>
                            <xsl:otherwise>
                                Not available
                            </xsl:otherwise>
                        </xsl:choose>
                    </td>
                </tr>
                <!-- Period reported -->
                <tr>
                    <td class="td_header_role_name">
                        <span class="td_label">
                            <xsl:text>@@FIRST_DAY_OF_PERIOD_REPORTED@@</xsl:text>
                        </span>
                    </td>
                    <td class="td_header_role_value">
                        <xsl:call-template name="show-time">
                            <xsl:with-param name="datetime" select="/n1:ClinicalDocument/n1:documentationOf
                                      /n1:serviceEvent/n1:effectiveTime/n1:low"/>
                        </xsl:call-template>
                    </td>
                </tr>
                <tr>
                    <td class="td_header_role_name">
                        <span class="td_label">
                            <xsl:text>@@LAST_DAY_OF_PERIOD_REPORTED@@</xsl:text>
                        </span>
                    </td>
                    <td class="td_header_role_value">
                        <xsl:call-template name="show-time">
                            <xsl:with-param name="datetime" select="/n1:ClinicalDocument/n1:documentationOf
                                      /n1:serviceEvent/n1:effectiveTime/n1:high"/>
                        </xsl:call-template>
                    </td>
                </tr>
            </tbody>
        </table>
    </xsl:template>
    <!-- show assignedEntity -->
    <xsl:template name="show-assignedEntity">
        <xsl:param name="asgnEntity"/>
        <xsl:choose>
            <xsl:when test="$asgnEntity/n1:assignedPerson/n1:name">
                <xsl:call-template name="show-name">
                    <xsl:with-param name="name" select="$asgnEntity/n1:assignedPerson/n1:name"/>
                </xsl:call-template>
                <xsl:if test="$asgnEntity/n1:representedOrganization/n1:name">
                    <xsl:text>@@_OF__1@@</xsl:text>
                    <xsl:value-of select="$asgnEntity/n1:representedOrganization/n1:name"/>
                </xsl:if>
            </xsl:when>
            <xsl:when test="$asgnEntity/n1:representedOrganization">
                <xsl:value-of select="$asgnEntity/n1:representedOrganization/n1:name"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:for-each select="$asgnEntity/n1:id">
                    <xsl:call-template name="show-id"/>
                    <xsl:choose>
                        <xsl:when test="position()!=last()">
                            <xsl:text>@@COMMA_NUMSPACE_3@@</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <br/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- show relatedEntity -->
    <xsl:template name="show-relatedEntity">
        <xsl:param name="relatedEntity"/>
        <xsl:choose>
            <xsl:when test="$relatedEntity/n1:relatedPerson/n1:name">
                <xsl:call-template name="show-name">
                    <xsl:with-param name="name" select="$relatedEntity/n1:relatedPerson/n1:name"/>
                </xsl:call-template>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!-- show associatedEntity -->
    <xsl:template name="show-associatedEntity">
        <xsl:param name="assoEntity"/>
        <xsl:choose>
            <xsl:when test="$assoEntity/n1:associatedPerson">
                <xsl:for-each select="$assoEntity/n1:associatedPerson/n1:name">
                    <xsl:call-template name="show-name">
                        <xsl:with-param name="name" select="."/>
                    </xsl:call-template>
                    <br/>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="$assoEntity/n1:scopingOrganization">
                <xsl:for-each select="$assoEntity/n1:scopingOrganization">
                    <xsl:if test="n1:name">
                        <xsl:call-template name="show-name">
                            <xsl:with-param name="name" select="n1:name"/>
                        </xsl:call-template>
                        <br/>
                    </xsl:if>
                    <xsl:if test="n1:standardIndustryClassCode">
                        <xsl:value-of select="n1:standardIndustryClassCode/@displayName"/>
                        <xsl:text>@@_CODE_@@</xsl:text>
                        <xsl:value-of select="n1:standardIndustryClassCode/@code"/>
                    </xsl:if>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="$assoEntity/n1:code">
                <xsl:call-template name="show-code">
                    <xsl:with-param name="code" select="$assoEntity/n1:code"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$assoEntity/n1:id">
                <xsl:value-of select="$assoEntity/n1:id/@extension"/>
                <xsl:text>@@SPACE_13@@</xsl:text>
                <xsl:value-of select="$assoEntity/n1:id/@root"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!-- show code
     if originalText present, return it, otherwise, check and return attribute: display name
     -->
    <xsl:template name="show-code">
        <xsl:param name="code"/>
        <xsl:variable name="this-codeSystem">
            <xsl:value-of select="$code/@codeSystem"/>
        </xsl:variable>
        <xsl:variable name="this-code">
            <xsl:value-of select="$code/@code"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$code/n1:originalText">
                <xsl:value-of select="$code/n1:originalText"/>
            </xsl:when>
            <xsl:when test="$code/@displayName">
                <xsl:value-of select="$code/@displayName"/>
            </xsl:when>
            <!--
         <xsl:when test="$the-valuesets/*/voc:system[@root=$this-codeSystem]/voc:code[@value=$this-code]/@displayName">
           <xsl:value-of select="$the-valuesets/*/voc:system[@root=$this-codeSystem]/voc:code[@value=$this-code]/@displayName"/>
         </xsl:when>
         -->
            <xsl:otherwise>
                <xsl:value-of select="$this-code"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- show classCode -->
    <xsl:template name="show-actClassCode">
        <xsl:param name="clsCode"/>
        <xsl:choose>
            <xsl:when test=" $clsCode = 'ACT' ">
                <xsl:text>@@HEALTHCARE_SERVICE@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'ACCM' ">
                <xsl:text>@@ACCOMMODATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'ACCT' ">
                <xsl:text>@@ACCOUNT@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'ACSN' ">
                <xsl:text>@@ACCESSION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'ADJUD' ">
                <xsl:text>@@FINANCIAL_ADJUDICATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'CONS' ">
                <xsl:text>@@CONSENT_1@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'CONTREG' ">
                <xsl:text>@@CONTAINER_REGISTRATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'CTTEVENT' ">
                <xsl:text>@@CLINICAL_TRIAL_TIMEPOINT_EVENT@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'DISPACT' ">
                <xsl:text>@@DISCIPLINARY_ACTION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'ENC' ">
                <xsl:text>@@ENCOUNTER@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'INC' ">
                <xsl:text>@@INCIDENT@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'INFRM' ">
                <xsl:text>@@INFORM@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'INVE' ">
                <xsl:text>@@INVOICE_ELEMENT@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'LIST' ">
                <xsl:text>@@WORKING_LIST@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'MPROT' ">
                <xsl:text>@@MONITORING_PROGRAM@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'PCPR' ">
                <xsl:text>@@CARE_PROVISION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'PROC' ">
                <xsl:text>@@PROCEDURE@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'REG' ">
                <xsl:text>@@REGISTRATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'REV' ">
                <xsl:text>@@REVIEW@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'SBADM' ">
                <xsl:text>@@SUBSTANCE_ADMINISTRATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'SPCTRT' ">
                <xsl:text>@@SPECIMEN_TREATMENT@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'SUBST' ">
                <xsl:text>@@SUBSTITUTION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'TRNS' ">
                <xsl:text>@@TRANSPORTATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'VERIF' ">
                <xsl:text>@@VERIFICATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $clsCode = 'XACT' ">
                <xsl:text>@@FINANCIAL_TRANSACTION@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!-- show participationType -->
    <xsl:template name="show-participationType">
        <xsl:param name="ptype"/>
        <xsl:choose>
            <xsl:when test=" $ptype='PPRF' ">
                <xsl:text>@@PRIMARY_PERFORMER@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $ptype='PRF' ">
                <xsl:text>@@PERFORMER@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $ptype='VRF' ">
                <xsl:text>@@VERIFIER@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $ptype='SPRF' ">
                <xsl:text>@@SECONDARY_PERFORMER@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!-- show participationFunction -->
    <xsl:template name="show-participationFunction">
        <xsl:param name="pFunction"/>
        <xsl:choose>
            <!-- From the HL7 v3 ParticipationFunction code system -->
            <xsl:when test=" $pFunction = 'ADMPHYS' ">
                <xsl:text>@@_ADMITTING_PHYSICIAN_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'ANEST' ">
                <xsl:text>@@_ANESTHESIST_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'ANRS' ">
                <xsl:text>@@_ANESTHESIA_NURSE_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'ATTPHYS' ">
                <xsl:text>@@_ATTENDING_PHYSICIAN_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'DISPHYS' ">
                <xsl:text>@@_DISCHARGING_PHYSICIAN_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'FASST' ">
                <xsl:text>@@_FIRST_ASSISTANT_SURGEON_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'MDWF' ">
                <xsl:text>@@_MIDWIFE_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'NASST' ">
                <xsl:text>@@_NURSE_ASSISTANT_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'PCP' ">
                <xsl:text>@@_PRIMARY_CARE_PHYSICIAN_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'PRISURG' ">
                <xsl:text>@@_PRIMARY_SURGEON_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'RNDPHYS' ">
                <xsl:text>@@_ROUNDING_PHYSICIAN_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'SASST' ">
                <xsl:text>@@_SECOND_ASSISTANT_SURGEON_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'SNRS' ">
                <xsl:text>@@_SCRUB_NURSE_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'TASST' ">
                <xsl:text>@@_THIRD_ASSISTANT_@@</xsl:text>
            </xsl:when>
            <!-- From the HL7 v2 Provider Role code system (2.16.840.1.113883.12.443) which is used by HITSP -->
            <xsl:when test=" $pFunction = 'CP' ">
                <xsl:text>@@_CONSULTING_PROVIDER_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'PP' ">
                <xsl:text>@@_PRIMARY_CARE_PROVIDER_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'RP' ">
                <xsl:text>@@_REFERRING_PROVIDER_@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $pFunction = 'MP' ">
                <xsl:text>@@_MEDICAL_HOME_PROVIDER_@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="formatDateTime">
        <xsl:param name="date"/>
        <!-- month -->
        <xsl:variable name="month" select="substring ($date, 5, 2)"/>
        <xsl:choose>
            <xsl:when test="$month='01'">
                <xsl:text>@@JANUARY_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='02'">
                <xsl:text>@@FEBRUARY_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='03'">
                <xsl:text>@@MARCH_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='04'">
                <xsl:text>@@APRIL_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='05'">
                <xsl:text>@@MAY_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='06'">
                <xsl:text>@@JUNE_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='07'">
                <xsl:text>@@JULY_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='08'">
                <xsl:text>@@AUGUST_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='09'">
                <xsl:text>@@SEPTEMBER_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='10'">
                <xsl:text>@@OCTOBER_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='11'">
                <xsl:text>@@NOVEMBER_@@</xsl:text>
            </xsl:when>
            <xsl:when test="$month='12'">
                <xsl:text>@@DECEMBER_@@</xsl:text>
            </xsl:when>
        </xsl:choose>
        <!-- day -->
        <xsl:choose>
            <xsl:when test='substring ($date, 7, 1)="0"'>
                <xsl:value-of select="substring ($date, 8, 1)"/>
                <xsl:text>@@COMMA_NUMSPACE_4@@</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="substring ($date, 7, 2)"/>
                <xsl:text>@@COMMA_NUMSPACE_5@@</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
        <!-- year -->
        <xsl:value-of select="substring ($date, 1, 4)"/>
        <!-- time and US timezone -->
        <xsl:if test="string-length($date) > 8">
            <xsl:text>@@COMMA_NUMSPACE_6@@</xsl:text>
            <!-- time -->
            <xsl:variable name="time">
                <xsl:value-of select="substring($date,9,6)"/>
            </xsl:variable>
            <xsl:variable name="hh">
                <xsl:value-of select="substring($time,1,2)"/>
            </xsl:variable>
            <xsl:variable name="mm">
                <xsl:value-of select="substring($time,3,2)"/>
            </xsl:variable>
            <xsl:variable name="ss">
                <xsl:value-of select="substring($time,5,2)"/>
            </xsl:variable>
            <xsl:if test="string-length($hh)&gt;1">
                <xsl:value-of select="$hh"/>
                <xsl:if test="string-length($mm)&gt;1 and not(contains($mm,'-')) and not (contains($mm,'+'))">
                    <xsl:text>@@COLON_1@@</xsl:text>
                    <xsl:value-of select="$mm"/>
                    <xsl:if test="string-length($ss)&gt;1 and not(contains($ss,'-')) and not (contains($ss,'+'))">
                        <xsl:text>@@COLON_2@@</xsl:text>
                        <xsl:value-of select="$ss"/>
                    </xsl:if>
                </xsl:if>
            </xsl:if>
            <!-- time zone -->
            <xsl:variable name="tzon">
                <xsl:choose>
                    <xsl:when test="contains($date,'+')">
                        <xsl:text>@@PLUS@@</xsl:text>
                        <xsl:value-of select="substring-after($date, '+')"/>
                    </xsl:when>
                    <xsl:when test="contains($date,'-')">
                        <xsl:text>@@MINUS@@</xsl:text>
                        <xsl:value-of select="substring-after($date, '-')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:variable>
            <xsl:choose>
                <!-- reference: http://www.timeanddate.com/library/abbreviations/timezones/na/ -->
                <xsl:when test="$tzon = '-0500' ">
                    <xsl:text>@@__EST@@</xsl:text>
                </xsl:when>
                <xsl:when test="$tzon = '-0600' ">
                    <xsl:text>@@__CST@@</xsl:text>
                </xsl:when>
                <xsl:when test="$tzon = '-0700' ">
                    <xsl:text>@@__MST@@</xsl:text>
                </xsl:when>
                <xsl:when test="$tzon = '-0800' ">
                    <xsl:text>@@__PST@@</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>@@SPACE_14@@</xsl:text>
                    <xsl:value-of select="$tzon"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    <!-- convert to lower case -->
    <xsl:template name="caseDown">
        <xsl:param name="data"/>
        <xsl:if test="$data">
            <xsl:value-of select="translate($data, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
        </xsl:if>
    </xsl:template>
    <!-- convert to upper case -->
    <xsl:template name="caseUp">
        <xsl:param name="data"/>
        <xsl:if test="$data">
            <xsl:value-of select="translate($data,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
        </xsl:if>
    </xsl:template>
    <!-- convert first character to upper case -->
    <xsl:template name="firstCharCaseUp">
        <xsl:param name="data"/>
        <xsl:if test="$data">
            <xsl:call-template name="caseUp">
                <xsl:with-param name="data" select="substring($data,1,1)"/>
            </xsl:call-template>
            <xsl:value-of select="substring($data,2)"/>
        </xsl:if>
    </xsl:template>
    <!-- show-noneFlavor -->
    <xsl:template name="show-noneFlavor">
        <xsl:param name="nf"/>
        <xsl:choose>
            <xsl:when test=" $nf = 'NI' ">
                <xsl:text>@@NO_INFORMATION@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $nf = 'INV' ">
                <xsl:text>@@INVALID@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $nf = 'MSK' ">
                <xsl:text>@@MASKED@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $nf = 'NA' ">
                <xsl:text>@@NOT_APPLICABLE@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $nf = 'UNK' ">
                <xsl:text>@@UNKNOWN@@</xsl:text>
            </xsl:when>
            <xsl:when test=" $nf = 'OTH' ">
                <xsl:text>@@OTHER@@</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="addCSS">
        <style type="text/css">
         <xsl:text>
body {
  background-color: #FFFFFF;
  font-family: -apple-system, Verdana, Tahoma, sans-serif;
  font-size: 2.0em;
  margin-left: 1.5em;
  margin-right: 1.5em;
  line-height: 1.1;
}

p {
  margin-top: 0em;
  margin-bottom: 0.5em;
}

a:link {
  color: #FF2D55;
  text-decoration: none;
}
a:visited {
  color: #FF2D55;
  text-decoration: none;
}

h1 {
  font-size: 1.75em;
  font-weight: bold;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.0em;
}

h3 {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h4 {
  font-size: 1.1em;
  font-weight: bold;
}

table {
  border-spacing: 0.5em 0.2em;
}

th {
  font-weight: bold;
  text-align: left;
  border-bottom: 1.5px solid #444;
}

td {
  vertical-align: top;
  border-bottom: 1px solid #444;
}

li {
  margin-bottom: 0.8em;
}

ul {
  margin-top: 0.7em;
}

.h1center {
  font-size: 2.0em;
  font-weight: bold;
  text-align: left;
  margin-bottom: -0.2em;
}

.header_table{
  margin-top: 0.0em;
  border: 0pt inset #00008b;
  border-collapse: separate;
  border-spacing: 10px 10px;
}

.td_label{
  font-weight: bold;
}

.td_header_role_name{
  border-bottom-style: solid;
  border-bottom-color: #444;
  border-bottom-width: 1.0px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  width: 25%;
}

.td_header_role_value{
  width: 75%;
  line-height: 1.35;
  border-bottom-style: solid;
  border-bottom-color: #444;
  border-bottom-width: 1.0px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
}

.Bold{
  font-weight: bold;
}

.Italics{
  font-style: italic;
}

.Underline{
  text-decoration:underline;
}

          </xsl:text>
        </style>
    </xsl:template>
</xsl:stylesheet>
