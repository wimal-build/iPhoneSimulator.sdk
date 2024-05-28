<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:d="http://www.apple.com/DTDs/DictionaryService-1.0.rng"
				version="1.0">
<xsl:output method="xml" encoding="UTF-8" indent="no"
	doctype-public="-//W3C//DTD XHTML 1.1//EN"
	doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd" />
<xsl:param name="orientation-vertical">0</xsl:param>
<xsl:param name="DCSAllowOrientationVertical">0</xsl:param>

<!--
	Swap css file with the vertical one if vertical orientation is specified.
	NOTE: $orientation-vertical is externally provided.
-->
<xsl:template match="head">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()" />
	</xsl:copy>
	<xsl:if test="$orientation-vertical = '1' and $DCSAllowOrientationVertical = '1'">
		<link rel="stylesheet" type="text/css" href="file://localhost/Library/Dictionaries/Shogakukan%20Daijisen.dictionary/Contents/VerticalStyle.css" />
	</xsl:if>
</xsl:template>

<!--
	Default rule for all other tags
-->
<xsl:template match="@*|node()">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()" />
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>
